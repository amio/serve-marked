# serve-marked

[![version][npm-badge]][npm-link]
[![repo][github-src]][github-link]

Serve [marked][marked] rendered README.md file with elegant style.

## Usage

`npm i serve-marked`

```javascript
const fs = require('fs')
const http = require('http')
const { serveMarked } = require('serve-marked')

const markdown = fs.readFileSync('./README.md', 'utf8')
const serveReadme = serveMarked(markdown)

http.createServer(serveReadme).listen(3000)
```

or you can use it with options:

```javascript
const serveReadme = serveMarked('# Markdown Content', {
  title: 'Awesome Project',
  preset: 'merri',  // Available presets: 'github', 'merri'
  contentClassName: 'main-body', // Default: 'markdown-body'
  inlineCSS: `
    @import url('https://rsms.me/inter/inter-ui.css');
    body { color: #333 }
  `,
  beforeHeadEnd: '<meta name="description" content="...">',
  beforeBodyEnd: '<script>/*...*/</script>',
})
```

WARNING: serve-marked does not sanitize the output HTML. Please use a sanitize library,
like [DOMPurify](https://github.com/cure53/DOMPurify),
[sanitize-html](https://github.com/apostrophecms/sanitize-html)
or [insane](https://github.com/bevacqua/insane) on the output HTML!

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
