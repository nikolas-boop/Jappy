#!/bin/bash

echo "🚀 Happy Dog App - Complete Deploy Script"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Timestamp
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
echo "Start: $TIMESTAMP"
echo ""

# Check if we're in correct directory
if [ ! -f "deploy-all.sh" ]; then
  echo -e "${RED}❌ Error: deploy-all.sh must be run from project root${NC}"
  exit 1
fi

# Create production directories
echo -e "${BLUE}Setting up production directories...${NC}"
mkdir -p production/public
mkdir -p production/api
mkdir -p production/database
echo -e "${GREEN}✓ Directories created${NC}"
echo ""

# STEP 1: Frontend Build
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}STEP 1: Building Frontend...${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
cd frontend || exit 1

if [ ! -f "package.json" ]; then
  echo -e "${RED}❌ Error: frontend/package.json not found${NC}"
  exit 1
fi

npm run build
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Frontend build failed${NC}"
  exit 1
fi

# Copy frontend dist to production/public
if [ -d "dist" ]; then
  echo -e "${YELLOW}Clearing production/public...${NC}"
  rm -rf ../production/public/*
  
  echo -e "${YELLOW}Copying frontend build to production/public...${NC}"
  cp -r dist/* ../production/public/
  
  echo -e "${GREEN}✓ Frontend build deployed to production/public${NC}"
else
  echo -e "${RED}❌ Frontend dist folder not found${NC}"
  exit 1
fi

cd .. || exit 1
echo ""

# STEP 2: Backend Sync
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}STEP 2: Syncing Backend...${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

if [ ! -f "backend/package.json" ]; then
  echo -e "${RED}❌ Error: backend/package.json not found${NC}"
  exit 1
fi

echo -e "${YELLOW}Clearing production/api...${NC}"
rm -rf production/api/*

echo -e "${YELLOW}Copying backend code to production/api...${NC}"
cp -r backend/* production/api/

# Remove node_modules (will be installed on server)
if [ -d "production/api/node_modules" ]; then
  echo -e "${YELLOW}Removing node_modules from production build...${NC}"
  rm -rf production/api/node_modules
fi

# Remove .git folder from backend
if [ -d "production/api/.git" ]; then
  rm -rf production/api/.git
fi

echo -e "${GREEN}✓ Backend synced to production/api${NC}"
echo ""

# STEP 3: Database Schema
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}STEP 3: Copying Database Schema...${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

if [ ! -f "database/schema.sql" ]; then
  echo -e "${RED}❌ Error: database/schema.sql not found${NC}"
  exit 1
fi

cp database/schema.sql production/database/
echo -e "${GREEN}✓ Database schema copied${NC}"
echo ""

# STEP 4: Config Files
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}STEP 4: Copying Config Templates...${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

cp .env.example production/
cp README.md production/

echo -e "${GREEN}✓ Config templates copied${NC}"
echo ""

# STEP 5: Summary
echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║         ✓ DEPLOYMENT COMPLETE!                        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}📦 production/ folder is ready to upload to server${NC}"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. 📤 Upload production/ folder to server:"
echo -e "   ${BLUE}rsync -avz production/ user@your-domain.com:~/public_html/${NC}"
echo ""
echo "2. 🔐 SSH into server and initialize:"
echo -e "   ${BLUE}ssh user@your-domain.com${NC}"
echo ""
echo "3. 🗄️  Create .env with real credentials:"
echo -e "   ${BLUE}cp production/.env.example production/.env${NC}"
echo -e "   ${BLUE}nano production/.env${NC}"
echo ""
echo "4. 💾 Initialize database:"
echo -e "   ${BLUE}mysql -u user -p dbname < production/database/schema.sql${NC}"
echo ""
echo "5. 📦 Install backend dependencies:"
echo -e "   ${BLUE}cd production/api && npm install${NC}"
echo ""
echo "6. 🚀 Start backend (with PM2 or Node):"
echo -e "   ${BLUE}npm start${NC}"
echo -e "   or: ${BLUE}pm2 start server.js --name 'happy-api'${NC}"
echo ""
echo "7. 🌐 Frontend is served from production/public/ via web server"
echo ""

TIMESTAMP_END=$(date +"%Y-%m-%d %H:%M:%S")
echo "Completed: $TIMESTAMP_END"
echo ""
