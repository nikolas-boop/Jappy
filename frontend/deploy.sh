#!/bin/bash

# Frontend Deploy Script
# Builds React app and copies to production/public

echo "Building Frontend..."

# Run npm build
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi

# Create production directories if they don't exist
mkdir -p ../production/public

# Clear old build
rm -rf ../production/public/*

# Copy new build
cp -r dist/* ../production/public/

echo "✓ Frontend deployed to ../production/public"
