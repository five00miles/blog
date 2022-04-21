# vuecli的配置
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

```javascript
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
# `.eslintignore`
`.eslintignore`采用`.gitignore`的glob规则
```
# 排除src/views/index 
src/*
!src/views
src/views/*
!src/views/index 
```

# loader和plugin的区别
## loader
用于对模块源码的转换，loader描述了webpack如何处理非javascript模块，并且在buld中引入这些依赖。

loader可以将文件从不同的语言（如TypeScript）转换为JavaScript，或者将内联图像转换为data URL。比如说：CSS-Loader，Style-Loader等。



## Plugin

目的在于解决loader无法实现的其他事，从打包优化和压缩，到重新定义环境变量，功能强大到可以用来处理各种各样的任务。webpack提供了很多开箱即用的插件：CommonChunkPlugin主要用于提取第三方库和公共模块，避免首屏加载的bundle文件，或者按需加载的bundle文件体积过大，导致加载时间过长，是一把优化的利器。而在多页面应用中，更是能够为每个页面间的应用程序共享代码创建bundle。


