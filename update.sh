#!/bin/bash
cd /root/setspace-website
git pull origin main
pnpm install
pnpm run deploy:build
pm2 restart setspace-website
echo "Site updated and live!"
