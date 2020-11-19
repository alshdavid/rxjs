const fs = require('fs')
const path = require('path')

const srcDir = fs.readdirSync(path.resolve(__dirname, 'src'))

for (const srcTarget of srcDir) {
  const name = srcTarget.split('.ts')[0]
  fs.rmdirSync(path.resolve(__dirname, name), { recursive: true })
  fs.rmdirSync(path.resolve(__dirname, `${name}.js`), { recursive: true })
  fs.rmdirSync(path.resolve(__dirname, `${name}.d.ts`), { recursive: true })
}