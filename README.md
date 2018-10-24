# serve-marked [![version][npm-badge]][npm-link] [![size][pp-badge]][pp-link]

Serve [marked][marked] rendered README.md file.

## Usage

`npm i serve-marked`

```javascript
const http = require('http')
const serveMarked = require('serve-marked')

// All options are optional
const options = {
  title: 'Awesome Project',
  preset: 'merri',  // Available presets: 'merri', 'github'
  contentClassName: 'markdown-body',
  inlineCSS: `
    @import url('https://rsms.me/inter/inter-ui.css');
    body { color: #333 }
  `,
  beforeHeadEnd: '<meta name="description" content="...">',
  beforeBodyEnd: '<script>/*...*/</script>',
  trackingGA: 'UA-XXXXXX-X'
}

const serveReadme = serveMarked('./README.md', options)

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
