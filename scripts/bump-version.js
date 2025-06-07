const fs = require('fs');
const path = require('path');
const pkgPath = path.resolve(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

let [major, minor, patch] = pkg.version.split('.').map(Number);
patch += 1;
pkg.version = [major, minor, patch].join('.');

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log('Version bumped to', pkg.version);