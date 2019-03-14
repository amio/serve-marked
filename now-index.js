const path = require('path')
const http = require('http')
const serveMarked = require('.')

const readmeFile = path.join(__dirname, 'README.md')

module.exports = serveMarked(readmeFile, {
  title: 'serve-marked: serve README.md at ease',
  inlineCSS: `
    .markdown-body h1 + p {
      text-align: center;
      margin: -2.6rem 0 4em 0;
    }
  `
})

if (require.main === module) {
  http.createServer(module.exports).listen(3000)
}
