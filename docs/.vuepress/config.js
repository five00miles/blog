const sidebar = require('./sidebar')

module.exports = {
  title: 'SHITGAMER',
  description: 'blog javascript nodejs java python linux',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    lastUpdated: true,
    sidebar: sidebar,
    // displayAllHeaders: true,
    record: '沪ICP备2022010893号-1',
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': '/docs/assets'
      }
    }
  }
}