#!/bin/bash

# Backend Deploy Script
# Syncs backend code to production/api

echo "Syncing Backend..."

# Create production/api if it doesn't exist
mkdir -p ../production/api

# Clear old backend code
rm -rf ../production/api/*

# Copy all backend files (excluding node_modules)
cp -r ./* ../production/api/

# Remove node_modules (will be installed on server)
rm -rf ../production/api/node_modules

# Remove .git folder if present
rm -rf ../production/api/.git

echo "✓ Backend synced to ../production/api"
