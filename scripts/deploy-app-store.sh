#!/bin/bash

# Apple App Store Deployment Script
# Bumps version, builds IPA, and submits to App Store Connect

set -e

echo "🍎 Woodworker's Companion - App Store Deployment"
echo "================================================="
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
echo -e "${BLUE}🔨 Step 3: Building and Submitting to App Store${NC}"
echo "This will:"
echo "  1. Build the iOS App Store IPA"
echo "  2. Submit it to TestFlight / App Store Connect"
echo ""
echo "⚠️  Note: You need an Apple Developer Account ($99/year)"
echo ""
read -p "Ready to proceed? (y/n): " confirm_submit

if [ "$confirm_submit" = "y" ]; then
  # Build and submit
  # We use --auto-submit to trigger submission after build
  # EAS will prompt for Apple ID credentials if not cached
  eas build --platform ios --profile production --auto-submit
else
  echo "Cancelled."
  exit 0
fi

echo -e "${GREEN}✅ Process initiated!${NC}"
echo "Monitor the build status in the link provided above."

