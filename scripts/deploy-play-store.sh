#!/bin/bash

# Google Play Store Deployment Script
# Bumps version, builds AAB, and submits to Play Store

set -e

echo "🚀 Woodworker's Companion - Google Play Deployment"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo -e "${RED}❌ Error: Must be run from project root${NC}"
  exit 1
fi

# Step 1: Version Bump
echo -e "${BLUE}📦 Step 1: Version Management${NC}"
echo "Select version bump type:"
echo "  1) Patch (1.0.0 -> 1.0.1)"
echo "  2) Minor (1.0.0 -> 1.1.0)"
echo "  3) Major (1.0.0 -> 2.0.0)"
echo "  4) Skip bump (use current version)"
read -p "Enter choice [1-4]: " bump_choice

case $bump_choice in
  1) npm run version:patch ;;
  2) npm run version:minor ;;
  3) npm run version:major ;;
  4) echo "Skipping version bump..." ;;
  *) echo -e "${RED}Invalid choice${NC}"; exit 1 ;;
esac

# Step 2: Git Status Check
if [ -n "$(git status --porcelain)" ]; then
  echo -e "${YELLOW}⚠️  You have uncommitted changes.${NC}"
  echo "It is recommended to commit changes before building."
  read -p "Continue anyway? (y/n): " continue_build
  if [ "$continue_build" != "y" ]; then
    exit 1
  fi
fi

# Step 3: Build & Submit
echo -e "${BLUE}🔨 Step 3: Building and Submitting to Google Play${NC}"
echo "This will:"
echo "  1. Build the Android App Bundle (AAB)"
echo "  2. Submit it to the 'internal' testing track"
echo ""
read -p "Ready to proceed? (y/n): " confirm_submit

if [ "$confirm_submit" = "y" ]; then
  # Check for service account key (any json file starting with woodworkercompanion-)
  if ! ls woodworkercompanion-*.json 1> /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Service account key not found (woodworkercompanion-*.json).${NC}"
    echo "You may need to log in interactively via EAS CLI."
  fi

  # Build and submit
  # We use --auto-submit to trigger submission after build
  # We use --clear-cache to ensure package name changes are picked up
  eas build --platform android --profile production --auto-submit --clear-cache
else
  echo "Cancelled."
  exit 0
fi

echo -e "${GREEN}✅ Process initiated!${NC}"
echo "Monitor the build status in the link provided above."

