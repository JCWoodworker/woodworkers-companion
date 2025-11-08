#!/usr/bin/env node

/**
 * Version Bump Script for Woodworker's Companion
 * 
 * Updates version across all relevant files:
 * - package.json
 * - app.json (expo.version, android.versionCode, ios.buildNumber)
 * - android/app/build.gradle (versionCode, versionName)
 * 
 * Usage: node scripts/bump-version.js [patch|minor|major]
 */

const fs = require('fs');
const path = require('path');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  red: '\x1b[31m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logError(message) {
  log(`❌ ${message}`, colors.red);
}

function logSuccess(message) {
  log(`✅ ${message}`, colors.green);
}

function logInfo(message) {
  log(`ℹ️  ${message}`, colors.blue);
}

function logWarning(message) {
  log(`⚠️  ${message}`, colors.yellow);
}

// Parse command line arguments
const bumpType = process.argv[2];
const validBumpTypes = ['patch', 'minor', 'major'];

if (!bumpType || !validBumpTypes.includes(bumpType)) {
  logError('Invalid bump type. Please specify: patch, minor, or major');
  console.log('\nUsage: node scripts/bump-version.js [patch|minor|major]');
  console.log('\nExamples:');
  console.log('  node scripts/bump-version.js patch  # 1.0.0 -> 1.0.1');
  console.log('  node scripts/bump-version.js minor  # 1.0.0 -> 1.1.0');
  console.log('  node scripts/bump-version.js major  # 1.0.0 -> 2.0.0');
  process.exit(1);
}

// File paths
const rootDir = path.join(__dirname, '..');
const packageJsonPath = path.join(rootDir, 'package.json');
const appJsonPath = path.join(rootDir, 'app.json');
const buildGradlePath = path.join(rootDir, 'android', 'app', 'build.gradle');

// Semver bump function
function bumpVersion(version, type) {
  const parts = version.split('.').map(Number);
  
  switch (type) {
    case 'major':
      parts[0]++;
      parts[1] = 0;
      parts[2] = 0;
      break;
    case 'minor':
      parts[1]++;
      parts[2] = 0;
      break;
    case 'patch':
      parts[2]++;
      break;
  }
  
  return parts.join('.');
}

function updatePackageJson(newVersion) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const oldVersion = packageJson.version;
    packageJson.version = newVersion;
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    logSuccess(`Updated package.json: ${oldVersion} → ${newVersion}`);
    return true;
  } catch (error) {
    logError(`Failed to update package.json: ${error.message}`);
    return false;
  }
}

function updateAppJson(newVersion) {
  try {
    const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
    const oldVersion = appJson.expo.version;
    
    // Update version
    appJson.expo.version = newVersion;
    
    // Update or add Android versionCode
    if (!appJson.expo.android) {
      appJson.expo.android = {};
    }
    const oldVersionCode = appJson.expo.android.versionCode || 1;
    const newVersionCode = oldVersionCode + 1;
    appJson.expo.android.versionCode = newVersionCode;
    
    // Update or add iOS buildNumber
    if (!appJson.expo.ios) {
      appJson.expo.ios = {};
    }
    const oldBuildNumber = appJson.expo.ios.buildNumber || '1';
    const newBuildNumber = String(parseInt(oldBuildNumber) + 1);
    appJson.expo.ios.buildNumber = newBuildNumber;
    
    fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + '\n');
    logSuccess(`Updated app.json:`);
    logInfo(`  version: ${oldVersion} → ${newVersion}`);
    logInfo(`  android.versionCode: ${oldVersionCode} → ${newVersionCode}`);
    logInfo(`  ios.buildNumber: ${oldBuildNumber} → ${newBuildNumber}`);
    return true;
  } catch (error) {
    logError(`Failed to update app.json: ${error.message}`);
    return false;
  }
}

function updateBuildGradle(newVersion) {
  try {
    let buildGradle = fs.readFileSync(buildGradlePath, 'utf8');
    
    // Extract current versionCode
    const versionCodeMatch = buildGradle.match(/versionCode\s+(\d+)/);
    const oldVersionCode = versionCodeMatch ? parseInt(versionCodeMatch[1]) : 1;
    const newVersionCode = oldVersionCode + 1;
    
    // Extract current versionName
    const versionNameMatch = buildGradle.match(/versionName\s+"([^"]+)"/);
    const oldVersionName = versionNameMatch ? versionNameMatch[1] : '1.0.0';
    
    // Update versionCode
    buildGradle = buildGradle.replace(
      /versionCode\s+\d+/,
      `versionCode ${newVersionCode}`
    );
    
    // Update versionName
    buildGradle = buildGradle.replace(
      /versionName\s+"[^"]+"/,
      `versionName "${newVersion}"`
    );
    
    fs.writeFileSync(buildGradlePath, buildGradle);
    logSuccess(`Updated android/app/build.gradle:`);
    logInfo(`  versionCode: ${oldVersionCode} → ${newVersionCode}`);
    logInfo(`  versionName: ${oldVersionName} → ${newVersion}`);
    return true;
  } catch (error) {
    logError(`Failed to update build.gradle: ${error.message}`);
    return false;
  }
}

// Main execution
async function main() {
  console.log('');
  log('🚀 Woodworker\'s Companion Version Bump', colors.blue);
  log('═'.repeat(50), colors.blue);
  console.log('');
  
  // Read current version from package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const currentVersion = packageJson.version;
  const newVersion = bumpVersion(currentVersion, bumpType);
  
  log(`Bumping version (${bumpType}): ${currentVersion} → ${newVersion}`, colors.yellow);
  console.log('');
  
  // Update all files
  const results = [
    updatePackageJson(newVersion),
    updateAppJson(newVersion),
    updateBuildGradle(newVersion),
  ];
  
  console.log('');
  
  if (results.every(result => result === true)) {
    log('═'.repeat(50), colors.green);
    logSuccess('All files updated successfully!');
    log('═'.repeat(50), colors.green);
    console.log('');
    logInfo('Next steps:');
    console.log('  1. Review the changes');
    console.log('  2. Commit the version bump:');
    console.log(`     git add -A`);
    console.log(`     git commit -m "chore: bump version to ${newVersion}"`);
    console.log(`     git tag v${newVersion}`);
    console.log('  3. Push the changes and tag:');
    console.log('     git push && git push --tags');
    console.log('');
  } else {
    log('═'.repeat(50), colors.red);
    logError('Some files failed to update. Please check the errors above.');
    log('═'.repeat(50), colors.red);
    process.exit(1);
  }
}

main().catch(error => {
  logError(`Unexpected error: ${error.message}`);
  process.exit(1);
});

