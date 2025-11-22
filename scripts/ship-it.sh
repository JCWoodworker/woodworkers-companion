#!/bin/bash

# Master Deployment Script
# Deploys to both Google Play and App Store

set -e

echo "🚀 Woodworker's Companion - Master Deployment"
echo "=============================================="
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
echo "Select version bump type (applies to both platforms):"
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

# Step 3: Select Platforms
echo -e "${BLUE}🎯 Step 3: Select Deployment Targets${NC}"
echo "  1) Android (Google Play)"
echo "  2) iOS (App Store)"
echo "  3) Both Android & iOS"
echo "  4) Web (Netlify)"
echo "  5) ALL PLATFORMS (Android, iOS, Web)"
read -p "Enter choice [1-5]: " platform_choice

case $platform_choice in
  1)
    echo -e "${BLUE}🤖 Deploying to Android...${NC}"
    eas build --platform android --profile production --auto-submit
    ;;
  2)
    echo -e "${BLUE}🍎 Deploying to iOS...${NC}"
    eas build --platform ios --profile production --auto-submit
    ;;
  3)
    echo -e "${BLUE}🚀 Deploying to Android AND iOS...${NC}"
    eas build --platform all --profile production --auto-submit
    ;;
  4)
    echo -e "${BLUE}🌐 Deploying to Web...${NC}"
    ./scripts/deploy-web.sh
    ;;
  5)
    echo -e "${BLUE}🚀 Deploying EVERYWHERE...${NC}"
    # Start mobile builds in background or parallel if possible, but sequential is safer for logs
    echo "Starting Mobile Builds (Android + iOS)..."
    eas build --platform all --profile production --auto-submit
    
    echo "Starting Web Build..."
    npm run build:web
    if command -v netlify &> /dev/null; then
      netlify deploy --prod
    else
      echo "Netlify CLI not found. Web build complete but not deployed."
    fi
    ;;
  *)
    echo -e "${RED}Invalid choice${NC}"
    exit 1
    ;;
esac

echo -e "${GREEN}✅ Master deployment process initiated!${NC}"

