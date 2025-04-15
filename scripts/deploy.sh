#!/usr/bin/env bash

# Load environment variables from .env.aws
set -a
source .env.aws
set +a

GIT_COMMIT_HASH=$(git rev-parse --short HEAD)

# Login to AWS ECR
echo "Logging in to AWS ECR..."
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin $REPOSITORY_URI

# Build the Docker image with production target and environment variables
echo "Building Docker image..."
docker build --platform=linux/amd64 --provenance=false --target production \
  --build-arg NODE_ENV=$NODE_ENV \
  --build-arg FRONTEND_PORT=$FRONTEND_PORT \
  --build-arg BACKEND_PORT=$BACKEND_PORT \
  --build-arg BACKEND_SOURCE=$BACKEND_SOURCE \
  --build-arg BACKEND_URL=$BACKEND_URL \
  -t $REPOSITORY_URI:$GIT_COMMIT_HASH \
  -f ./docker/Dockerfile .

# Tag the image with latest
echo "Tagging image as latest..."
docker tag $REPOSITORY_URI:$GIT_COMMIT_HASH $REPOSITORY_URI:latest

# Push both tags to ECR
echo "Pushing images to ECR..."
docker push $REPOSITORY_URI:$GIT_COMMIT_HASH
docker push $REPOSITORY_URI:latest

if [[ "$ECS_CLUSTER" != *"TODO"* && "$ECS_SERVICE" != *"TODO"* ]]; then
  # Restart ECS service
  echo "Restarting ECS service..."
  aws ecs update-service \
    --cluster $ECS_CLUSTER \
    --service $ECS_SERVICE \
    --force-new-deployment \
    --output text \
    --no-cli-pager > /dev/null
fi

echo "Deployment complete!"

