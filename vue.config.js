module.exports = {
  productionSourceMap: false,
  chainWebpack: (config) => {
    // config.plugins.delete('prefetch-index')
    // config.plugins.delete('preload-index')

    config.plugin('preload-index').tap(options => {
      console.log('options', options)
      options[0].fileWhitelist = [/web1\.[0-9a-z]+\.js$/]
      options[0].include = 'all'

      return options
    })
    config.plugin('prefetch-index').tap(options => {
      options[0].fileWhitelist = [/web1\.[0-9a-z]+\.js$/]
      options[0].include = 'all'

      return options
    })
  },
  configureWebpack: {
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       echarts: {
    //         name: 'echarts',
    //         test: /[\\/]node_modules[\\/]_?echarts(.*)/,
    //         chunks: 'all',
    //         priority: 7
    //       }
    //     }
    //   }
    // }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      title: '试验名字'
      // chunks: ['chunk-vendors', 'index', 'echarts']
    }
  }
}
