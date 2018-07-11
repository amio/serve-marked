const fs = require('fs')
const path = require('path')
const marked = require('marked')

module.exports = function (mdFile, helmetOptions) {
  const rawMD = fs.readFileSync(mdFile, 'utf8')
  const bodyHTML = marked(rawMD)
  const pageHTML = helmet(bodyHTML, helmetOptions)
  return function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    res.end(pageHTML)
  }
}

function helmet (bodyHTML, options) {
  // Custom body wrapper
  if (typeof options === 'function') {
    return options(bodyHTML)
  }

  const { title = '', preset, inlineCSS, trackingGA } = options

  return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${title}</title>
        ${getPresetStyle(preset)}
        <style>${inlineCSS}</style>
        ${generateGAScript(trackingGA)}
      </head>
      <body>
        ${bodyHTML}
      </body>
    </html>
  `
}

function getPresetStyle (preset) {
  const presetNames = ['merri']
  if (!presetNames.includes(preset)) return ''

  const cssFile = path.join(__dirname, `presets/${preset}.css`)
  return `<style>${fs.readFileSync(cssFile, 'utf8')}</style>`
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
