# serve-marked

[![version][npm-badge]][npm-link]
[![repo][github-src]][github-link]

Serve [marked][marked] rendered README.md file.

## Usage

`npm i serve-marked`

```javascript
const http = require('http')
const serveMarked = require('serve-marked')

const serveReadme = serveMarked('./README.md')

http.createServer((req, res) => {
  if (req.url === '/') return serveReadme(req, res)
}).listen(3000)
```

or you can use it with options:

```javascript
const serveReadme = serveMarked('./README.md', {
  title: 'Awesome Project',
  preset: 'merri',  // Available presets: 'github', 'merri'
  contentClassName: 'main-body', // Default: 'markdown-body'
  inlineCSS: `
    @import url('https://rsms.me/inter/inter-ui.css');
    body { color: #333 }
  `,
  beforeHeadEnd: '<meta name="description" content="...">',
  beforeBodyEnd: '<script>/*...*/</script>',
  trackingGA: 'UA-XXXXXX-X'
})
```

## Example

- https://serve-marked.now.sh ([src][now-index-src])

## License

![ISC][license-src]

[github-src]: https://badgen.net/badge/-/amio%2Fserve-marked/black?icon=github&label=
[github-link]: https://github.com/amio/serve-marked
[license-src]: https://badgen.net/badge/license/ISC/blue
[npm-badge]: https://badgen.net/npm/v/serve-marked
[npm-link]: https://www.npmjs.com/package/serve-marked
[marked]: https://github.com/markedjs/marked
[now-index-src]: https://github.com/amio/serve-marked/blob/master/now-index.js
