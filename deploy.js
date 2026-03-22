#!/usr/bin/env node
/**
 * Happy Dog App - Deploy Script (Node.js)
 * Builds Frontend + Syncs Backend + Copies Database
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\x1b[32m🚀 Happy Dog App - Deploy Script\x1b[0m');
console.log('\x1b[32m===================================\x1b[0m\n');

const ROOT = __dirname;

// Utility functions
function log(msg, color = '0') {
  const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    red: '\x1b[31m'
  };
  console.log(`${colors[color] || colors[color]}${msg}${colors.reset}`);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) {
    throw new Error(`Source not found: ${src}`);
  }
  
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true });
  }
  
  fs.cpSync(src, dest, { recursive: true });
}

function runCommand(cmd, cwd = ROOT) {
  try {
    execSync(cmd, { cwd, stdio: 'inherit' });
    return true;
  } catch (err) {
    log(`Error executing: ${cmd}`, 'red');
    return false;
  }
}

try {
  // Setup production directories
  log('Setting up production directories...', 'blue');
  ensureDir(path.join(ROOT, 'production/public'));
  ensureDir(path.join(ROOT, 'production/api'));
  ensureDir(path.join(ROOT, 'production/database'));
  log('✓ Directories created\n', 'green');

  // STEP 1: Frontend Build
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'blue');
  log('STEP 1: Building Frontend...', 'blue');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'blue');

  const frontendDir = path.join(ROOT, 'frontend');
  if (!fs.existsSync(path.join(frontendDir, 'package.json'))) {
    throw new Error('frontend/package.json not found');
  }

  if (!runCommand('npm run build', frontendDir)) {
    throw new Error('Frontend build failed');
  }

  const distDir = path.join(frontendDir, 'dist');
  if (!fs.existsSync(distDir)) {
    throw new Error('Frontend dist folder not found');
  }

  log('Copying frontend build to production/public...', 'yellow');
  copyDirSync(distDir, path.join(ROOT, 'production/public'));
  log('✓ Frontend build deployed to production/public\n', 'green');

  // STEP 2: Backend Sync
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'blue');
  log('STEP 2: Syncing Backend...', 'blue');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'blue');

  const backendDir = path.join(ROOT, 'backend');
  if (!fs.existsSync(path.join(backendDir, 'package.json'))) {
    throw new Error('backend/package.json not found');
  }

  log('Clearing production/api...', 'yellow');
  const prodApiDir = path.join(ROOT, 'production/api');
  if (fs.existsSync(prodApiDir)) {
    fs.rmSync(prodApiDir, { recursive: true });
  }
  fs.mkdirSync(prodApiDir, { recursive: true });

  log('Copying backend code to production/api...', 'yellow');
  
  // Copy all backend files except node_modules and .git
  const backendFiles = fs.readdirSync(backendDir);
  backendFiles.forEach(file => {
    if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
      const src = path.join(backendDir, file);
      const dest = path.join(prodApiDir, file);
      if (fs.statSync(src).isDirectory()) {
        fs.cpSync(src, dest, { recursive: true });
      } else {
        fs.copyFileSync(src, dest);
      }
    }
  });

  log('✓ Backend synced to production/api\n', 'green');

  // STEP 3: Database Schema
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'blue');
  log('STEP 3: Copying Database Schema...', 'blue');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'blue');

  const schemaFile = path.join(ROOT, 'database/schema.sql');
  if (!fs.existsSync(schemaFile)) {
    throw new Error('database/schema.sql not found');
  }

  fs.copyFileSync(schemaFile, path.join(ROOT, 'production/database/schema.sql'));
  log('✓ Database schema copied\n', 'green');

  // STEP 4: Config Files
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'blue');
  log('STEP 4: Copying Config Templates...', 'blue');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'blue');

  fs.copyFileSync(
    path.join(ROOT, '.env.example'),
    path.join(ROOT, 'production/.env.example')
  );
  fs.copyFileSync(
    path.join(ROOT, 'README.md'),
    path.join(ROOT, 'production/README.md')
  );

  log('✓ Config templates copied\n', 'green');

  // Summary
  log('╔════════════════════════════════════════════════════════╗', 'green');
  log('║         ✓ DEPLOYMENT COMPLETE!                        ║', 'green');
  log('╚════════════════════════════════════════════════════════╝\n', 'green');

  log('📦 production/ folder is ready to upload to server', 'yellow');
  log('\n📋 Next Steps:\n', 'blue');
  log('1. 📤 Upload production/ folder to server (via SFTP/FTP)');
  log('2. 🔐 SSH into server and copy .env.example → .env');
  log('3. 💾 Initialize database: mysql dbname < production/database/schema.sql');
  log('4. 📦 Install backend: cd production/api && npm install');
  log('5. 🚀 Start API: npm start or pm2 start server.js\n');

  process.exit(0);
} catch (error) {
  log(`\n❌ Error: ${error.message}`, 'red');
  process.exit(1);
}
