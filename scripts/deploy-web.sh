#!/bin/bash

# Web Deployment Script for Woodworker's Companion
# Builds and optionally deploys to Netlify

set -e

echo "🌐 Woodworker's Companion - Web Deployment"
echo "==========================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: Must be run from project root"
  exit 1
fi

# Clean previous build
echo -e "${BLUE}🧹 Cleaning previous build...${NC}"
rm -rf dist

# Build for web
echo -e "${BLUE}🔨 Building for web...${NC}"
npm run build:web

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Build successful!${NC}"
  echo ""
  echo "Build output: dist/"
  echo ""
  
  # Check if netlify CLI is installed
  if command -v netlify &> /dev/null; then
    echo -e "${YELLOW}Netlify CLI detected!${NC}"
    echo ""
    echo "What would you like to do?"
    echo "  1) Preview locally (recommended first)"
    echo "  2) Deploy to Netlify (draft)"
    echo "  3) Deploy to production"
    echo "  4) Exit"
    echo ""
    read -p "Enter choice [1-4]: " choice
    
    case $choice in
      1)
        echo -e "${BLUE}🚀 Starting local preview...${NC}"
        npx serve dist
        ;;
      2)
        echo -e "${BLUE}📤 Deploying draft to Netlify...${NC}"
        netlify deploy
        ;;
      3)
        echo -e "${YELLOW}⚠️  Deploying to PRODUCTION${NC}"
        read -p "Are you sure? (yes/no): " confirm
        if [ "$confirm" = "yes" ]; then
          echo -e "${BLUE}📤 Deploying to production...${NC}"
          netlify deploy --prod
        else
          echo "Cancelled."
        fi
        ;;
      4)
        echo "Done!"
        exit 0
        ;;
      *)
        echo "Invalid choice"
        exit 1
        ;;
    esac
  else
    echo -e "${YELLOW}Netlify CLI not installed${NC}"
    echo ""
    echo "To preview locally:"
    echo "  npm run preview:web"
    echo ""
    echo "To deploy to Netlify:"
    echo "  1) Install CLI: npm install -g netlify-cli"
    echo "  2) Run: netlify deploy"
    echo ""
    echo "Or deploy via Netlify website:"
    echo "  https://app.netlify.com/drop"
    echo "  (Drag and drop the 'dist' folder)"
  fi
else
  echo -e "${RED}❌ Build failed${NC}"
  exit 1
fi

