#!/bin/sh

echo "Running start.sh"

# Log environment variables
echo "Environment variables:"
echo "FRONTEND_PORT: $FRONTEND_PORT"
echo "BACKEND_PORT: $BACKEND_PORT"
echo "BACKEND_URL: $BACKEND_URL"
echo "NODE_ENV: $NODE_ENV"

# very bad idea, now anyone can login to this database I do not care about
export POSTGRES_URL=postgresql://postgres:LmTmcGZKFCD2QRjkZFyi@sofeng-db.cbaosgy847f1.us-east-2.rds.amazonaws.com:5432/postgres
#postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public
echo "POSTGRES_URL: ${POSTGRES_URL}"

# Push schema to DB
yarn workspace database push

# Build the frontend
echo "Building frontend..."
cd /app/apps/frontend
yarn build

# Start the backend server in the background
echo "Starting backend..."
cd /app/apps/backend
PORT=$BACKEND_PORT yarn docker:run &
BACKEND_PID=$!

# Handle signals properly
trap "kill $BACKEND_PID; exit" SIGINT SIGTERM

# Start nginx in the foreground
echo "Starting nginx..."

# Generate nginx.conf from template
envsubst '${BACKEND_PORT} ${FRONTEND_PORT}' < /etc/nginx/http.d/template > /etc/nginx/http.d/default.conf

# Start NGINX
nginx -g "daemon off;"