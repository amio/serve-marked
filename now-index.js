const http = require('http')
const serveMarked = require('.')

const serveReadme = serveMarked('./README.md', {
  title: 'serve-marked: serve README.md at ease',
  inlineCSS: `
    .markdown-body h1 + p {
      text-align: center;
      margin: -2.6rem 0 4em 0;
    }
  `
})

http.createServer(serveReadme).listen(3000)
