```javascript
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
```



## element-vue-admin

```js
'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '管理后台' // page title

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    before: require('./mock/mock-server.js'),
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {},
    },
  },
  chainWebpack(config) {
    // config.plugin('preload').tap(() => [
    //   {
    //     rel: 'preload',
    //     fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
    //     include: 'initial',
    //   },
    // ])

    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()

    config.when(process.env.NODE_ENV !== 'development', (config) => {
      //   config
      //     .plugin('ScriptExtHtmlWebpackPlugin')
      //     .after('html')
      //     .use('script-ext-html-webpack-plugin', [
      //       {
      //         // `runtime` must same as runtimeChunk name. default is `runtime`
      //         inline: /runtime\..*\.js$/,
      //       },
      //     ])
      //     .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      })
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk('single')
    })
  },
}

```

