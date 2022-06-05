
const printf                    = console.log


module.exports = {

    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                appId: 'com.ilse.notebook',
                win: {
                    // icon: 'src/assets/logo.svg',
                },
                linux: {
                    // icon: 'src/assets/logo.svg',
                    category: "Productivity",
                },
                mac: {
                    // icon: 'src/assets/logo.svg',
                    category: "Productivity",
                }

            },
            nodeModulesPath: [ './node_modules' ],
            // mainProcessFile: 'dist_electron/bundled/background.js',
            nodeIntegration: true,
            preload: 'src/preload.js',
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

