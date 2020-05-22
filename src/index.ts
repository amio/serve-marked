import marked from 'marked'

const presets = {
  'default': require('./presets/default.css'),
  'github': require('./presets/github.css'),
  'merri': require('./presets/merri.css'),
}

interface HTMLOptions {
  title?: string;
  preset?: string;
  inlineCSS?: string;
  contentClassName?: string;
  beforeHeadEnd?: string;
  beforeBodyEnd?: string;
  trackingGA?: string;
}

export default function serveMarked (markdown: string, options?: HTMLOptions) {
  const bodyHTML = marked(markdown)
  const pageHTML = helmet(bodyHTML, options)
  return function (req, res) {
    if (req.url === '/favicon.ico') {
      res.writeHead(404, { 'Cache-Control': 'public, s-maxage=86400' })
      return res.end()
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    return res.end(pageHTML)
  }
}

function helmet (bodyHTML: string, options: HTMLOptions = {}) {
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

  console.warn('serve-marked: `trackingGA` option is deprecated. Please use `beforeHeadEnd` or `beforeBodyEnd` instead.')

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
