const fs = require('fs')
const path = require('path')
const http = require('http')
const serveMarked = require('.')

const readmeFile = path.join(__dirname, 'README.md')
const readmeContent = fs.readFileSync(readmeFile, 'utf8')

module.exports = serveMarked(readmeContent, {
  title: 'serve-marked: serve markdown at ease',
  inlineCSS: `
    .markdown-body h1 + p {
      text-align: center;
      margin: -40px 0 4rem 0;
      line-height: 20px;
      height: 20px;
    }
  `
})

if (require.main === module) {
  http.createServer(module.exports).listen(3000)
}
