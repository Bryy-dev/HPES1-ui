// deploy.js
import { execSync } from 'child_process';
import fs from 'fs';

const BUILD_CMD = 'npm run build';
const DEPLOY_BRANCH = 'deploy'; // Change this to your target branch
const DIST_DIR = 'dist';
const TEMP_DIR = '.deploy-temp';

try {
    console.log('🔨 Building project...');
    execSync(BUILD_CMD, { stdio: 'inherit' });

    console.log('📁 Preparing temp directory...');
    if (fs.existsSync(TEMP_DIR)) {
        fs.rmSync(TEMP_DIR, { recursive: true });
    }

    fs.mkdirSync(TEMP_DIR);
    execSync(`cp -r ${DIST_DIR}/. ${TEMP_DIR}/`);

    console.log('🌿 Switching to deploy branch...');
    execSync(`git checkout ${DEPLOY_BRANCH}`);

    console.log('🧹 Cleaning old files...');
    execSync('git rm -rf .');
    execSync(`cp -r ${TEMP_DIR}/. .`);

    console.log('📦 Committing and pushing to deploy branch...');
    execSync('git add .');
    execSync(`git commit -m "Deploy at ${new Date().toISOString()}"`);
    execSync('git push');

    console.log('🔁 Switching back to previous branch...');
    execSync('git checkout -');

    console.log('🧼 Cleaning up temp files...');
    fs.rmSync(TEMP_DIR, { recursive: true });

    console.log('✅ Deploy complete!');
} catch (error) {
    console.error('❌ Error during deployment:', error.message);
    process.exit(1);
}
