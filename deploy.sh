#!/bin/bash

# Exit on error
set -e

# Build your project
echo "Building project..."
npm run build

# Temp directory for deployment
TEMP_DIR=$(mktemp -d)

# Copy dist to temp
cp -r dist/* "$TEMP_DIR"

# Save current branch name
CURRENT_BRANCH=$(git branch --show-current)

# Switch to deployment branch
git checkout deployment

# Remove everything and copy new build
rm -rf *
cp -r "$TEMP_DIR"/* .

# Commit and push
git add .
git commit -m "Deploy from $CURRENT_BRANCH at $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
git push origin deployment

# Switch back
git checkout "$CURRENT_BRANCH"

# Cleanup
rm -rf "$TEMP_DIR"

echo "✅ Deployment complete."
