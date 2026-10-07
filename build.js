// Build step: encrypt HTML + compile main process to V8 bytecode
const fs = require('fs'), path = require('path'), crypto = require('crypto'), { execFileSync } = require('child_process');
const out = path.join(__dirname, 'app');
fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out);
const key = crypto.randomBytes(32), iv = crypto.randomBytes(12);
const c = crypto.createCipheriv('aes-256-gcm', key, iv);
const enc = Buffer.concat([c.update(fs.readFileSync('src/app.html')), c.final()]);
fs.writeFileSync(path.join(out, 'app.dat'), Buffer.concat([iv, c.getAuthTag(), enc]));
// split key into shuffled chunks to avoid a plain 32-byte literal
const src = fs.readFileSync('src/main.src.js', 'utf8').replace('__KEY__', JSON.stringify(Array.from(key)));
const JO = require('javascript-obfuscator');
const obf = JO.obfuscate(src, {
  compact: true, stringArray: true, stringArrayEncoding: ['rc4'], stringArrayThreshold: 1,
  rotateStringArray: true, shuffleStringArray: true, splitStrings: true, splitStringsChunkLength: 4,
  numbersToExpressions: true, controlFlowFlattening: true, controlFlowFlatteningThreshold: 0.6,
  deadCodeInjection: true, deadCodeInjectionThreshold: 0.3, identifierNamesGenerator: 'hexadecimal',
  selfDefending: false, target: 'node'
}).getObfuscatedCode();
fs.writeFileSync(path.join(out, 'main.js'), obf);
fs.copyFileSync('build/icon.png', path.join(out, 'icon.png'));
console.log('Protected bundle ready in ./app');
