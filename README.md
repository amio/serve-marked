# serve-marked [![version][npm-badge]][npm-link] [![size][pp-badge]][pp-link]

Serve [marked][marked] rendered README.md file.

## Usage

`npm i serve-marked`

```javascript
const http = require('http')
const serveMarked = require('serve-marked')

const serveReadme = serveMarked('./README.md', {
  title: 'Awesome Title', // page title
  preset: 'merri',  // css preset
  inlineCSS: `
    @import 'custom.css'
    body { color: #333 }
  `
})

http.createServer((req, res) => {
  if (req.url === '/') return serveReadme(req, res)
}).listen(3000)
```

## License

![ISC](https://badgen.now.sh/badge/license/ISC/blue)

[npm-badge]: https://badgen.now.sh/npm/v/serve-marked
[npm-link]: https://www.npmjs.com/package/serve-marked
[pp-badge]: https://packagephobia.now.sh/badge?p=serve-marked
[pp-link]: https://packagephobia.now.sh/result?p=serve-marked
[marked]: https://github.com/markedjs/marked
