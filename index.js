const fs = require('fs')
const marked = require('marked')
const { join } = require('path')

const presets = {
  'default': fs.readFileSync(join(__dirname, `presets/default.css`), 'utf8'),
  'github': fs.readFileSync(join(__dirname, `presets/github.css`), 'utf8'),
  'merri': fs.readFileSync(join(__dirname, `presets/merri.css`), 'utf8')
}

module.exports = function (mdFile, helmetOptions) {
  const rawMD = fs.readFileSync(mdFile, 'utf8')
  const bodyHTML = marked(rawMD)
  const pageHTML = helmet(bodyHTML, helmetOptions)
  return function (req, res) {
    if (req.url === '/favicon.ico') {
      res.writeHead(404, { 'Cache-Control': 'public, s-maxage=86400' })
      return res.end()
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(pageHTML)
  }
}

function helmet (bodyHTML, options = {}) {
  // Custom body wrapper
  if (typeof options === 'function') {
    return options(bodyHTML)
  }

  const {
    title = '',
    preset = 'default',
    inlineCSS = '',
    contentClassName = 'markdown-body',
    beforeHeadEnd = '',
    beforeBodyEnd = '',
    trackingGA,
  } = options

  return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width">
        <title>${title}</title>
        <style>${presets[preset]}</style>
        <style>${inlineCSS}</style>
        ${generateGAScript(trackingGA)}
        ${beforeHeadEnd}
      </head>
      <body>
        <div class="${contentClassName}">
          ${bodyHTML}
        </div>
        ${beforeBodyEnd}
      </body>
    </html>
  `
}

function generateGAScript (uaid) {
  if (typeof uaid !== 'string') return ''

  return `
    <script async src="https://www.googletagmanager.com/gtag/js?id=${uaid}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${uaid}');
    </script>
  `
}
