#!/bin/bash

# Script to reset database, push schema, and seed data

echo "===== Database Reset Script ====="

# Step 1: Drop all tables from the database
echo "Step 1: Dropping all tables..."
# Using Prisma's db push with --force-reset which will wipe the database
yarn workspace database prisma db push --force-reset --skip-generate
echo "✅ Tables dropped successfully"

# Step 2: Run yarn workspace database push
echo "Step 2: Running schema push..."
yarn workspace database push
echo "✅ Schema pushed successfully"

# Step 3: Seed the database
echo "Step 3: Seeding the database..."
yarn seed
echo "✅ Database seeded successfully"

echo "===== Database reset complete! ====="