const fs = require('fs');
const path = require('path');

const envDir = path.resolve(process.cwd(), '.env');

if(!fs.existsSync(envDir)) {
    fs.writeFileSync(envDir, fs.readFileSync(path.resolve(process.cwd(), '.env.example')));
    console.log('.env Created');
}
