
const printf                    = console.log


module.exports = {

    productionSourceMap: false,

    pluginOptions: {
      electronBuilder: {
        builderOptions: {
          appId: 'com.ilse.notebook',
          win: {},
          linux: {
            category: 'Productivity'
          },
          mac: {
            category: 'Productivity'
          }
        },
        nodeModulesPath: [
          './node_modules'
        ],
        nodeIntegration: true,
        preload: 'src/preload.js'
      },
      i18n: {
        locale: 'en',
        fallbackLocale: 'en',
        localeDir: 'locales',
        enableInSFC: true,
        enableBridge: false
      }
    },

    lintOnSave: false,
    // For Electron
    publicPath: process.env.NODE_ENV  ===  'production'  ?  './'  :  '/',
    // publicPath: process.env.NODE_ENV  ===  'production'  ?  './'  :  '/'
    configureWebpack: {
        // "web" | "webworker" | "node" | "async-node" | "node-webkit" | "electron-main" | "electron-renderer" | "electron-preload" | function
        // target: "electron-renderer",
        module: {
            rules: [

                {
                    test: /\.icss$/,
                    // loader: [ "to-string-loader", "css-loader" ]
                    loader: [ "to-string-loader", "css-loader" ]
                    // loader: "raw-text-loader"

                },

                // {
                    // test: /\.iyml$/,
                    // type: "json",
                    // loader: [ "to-string-loader", "yaml-loader" ],
                // }
            ]
        }
    }
}

