# Happy Dog App - Deploy Script (PowerShell)

Write-Host "🚀 Happy Dog App - Complete Deploy Script" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "deploy-all.ps1")) {
    Write-Host "❌ Error: deploy-all.ps1 must be run from project root" -ForegroundColor Red
    exit 1
}

# Create production directories
Write-Host "Setting up production directories..." -ForegroundColor Blue
New-Item -ItemType Directory -Force -Path "production\public" | Out-Null
New-Item -ItemType Directory -Force -Path "production\api" | Out-Null
New-Item -ItemType Directory -Force -Path "production\database" | Out-Null
Write-Host "✓ Directories created" -ForegroundColor Green
Write-Host ""

# STEP 1: Frontend Build
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Blue
Write-Host "STEP 1: Building Frontend..." -ForegroundColor Blue
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Blue

Push-Location frontend

if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: frontend/package.json not found" -ForegroundColor Red
    exit 1
}

npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend build failed" -ForegroundColor Red
    exit 1
}

if (Test-Path "dist") {
    Write-Host "Clearing production/public..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "..\production\public\*" -ErrorAction SilentlyContinue
    
    Write-Host "Copying frontend build to production/public..." -ForegroundColor Yellow
    Copy-Item "dist\*" "..\production\public\" -Recurse -Force
    
    Write-Host "✓ Frontend build deployed to production/public" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend dist folder not found" -ForegroundColor Red
    exit 1
}

Pop-Location
Write-Host ""

# STEP 2: Backend Sync
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Blue
Write-Host "STEP 2: Syncing Backend..." -ForegroundColor Blue
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Blue

if (-not (Test-Path "backend/package.json")) {
    Write-Host "❌ Error: backend/package.json not found" -ForegroundColor Red
    exit 1
}

Write-Host "Clearing production/api..." -ForegroundColor Yellow
Remove-Item -Recurse -Force "production\api\*" -ErrorAction SilentlyContinue

Write-Host "Copying backend code to production/api..." -ForegroundColor Yellow
Copy-Item "backend\*" "production\api\" -Recurse -Force

# Remove unneeded folders
Write-Host "Removing node_modules and .git from production build..." -ForegroundColor Yellow
Remove-Item -Recurse -Force "production\api\node_modules" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "production\api\.git" -ErrorAction SilentlyContinue

Write-Host "✓ Backend synced to production/api" -ForegroundColor Green
Write-Host ""

# STEP 3: Database Schema
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Blue
Write-Host "STEP 3: Copying Database Schema..." -ForegroundColor Blue
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Blue

if (-not (Test-Path "database/schema.sql")) {
    Write-Host "❌ Error: database/schema.sql not found" -ForegroundColor Red
    exit 1
}

Copy-Item "database\schema.sql" "production\database\" -Force
Write-Host "✓ Database schema copied" -ForegroundColor Green
Write-Host ""

# STEP 4: Config Files
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Blue
Write-Host "STEP 4: Copying Config Templates..." -ForegroundColor Blue
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Blue

Copy-Item ".env.example" "production\"
Copy-Item "README.md" "production\"

Write-Host "✓ Config templates copied" -ForegroundColor Green
Write-Host ""

# Summary
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║         ✓ DEPLOYMENT COMPLETE!                        ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "📦 production/ folder is ready to upload to server" -ForegroundColor Yellow
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. 📤 Upload production/ folder to server (via SFTP/FTP)" -ForegroundColor White
Write-Host "2. 🔐 SSH into server and copy .env.example → .env" -ForegroundColor White
Write-Host "3. 💾 Initialize database: mysql dbname < production/database/schema.sql" -ForegroundColor White
Write-Host "4. 📦 Install backend: cd production/api && npm install" -ForegroundColor White
Write-Host "5. 🚀 Start API: npm start or pm2 start server.js" -ForegroundColor White
Write-Host ""
