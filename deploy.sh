# Switch to development branch and pull latest
git checkout development
git pull origin development

# Run your build process
npm run build
# or yarn build
# or whatever your build command is

# Switch to production branch
git checkout production
git pull origin production

# Copy dist files and commit
cp -r dist/* .
git add .
git commit -m "Deploy build from development branch"
git push origin production

# Switch back to development
git checkout development