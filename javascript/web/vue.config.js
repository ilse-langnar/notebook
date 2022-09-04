const printf                    = console.log

const HtmlPlugin                  = require("html-webpack-plugin")
let HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {

    // runtimeCompiler: true,

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

        plugins: [

            // new HtmlPlugin({
                // inject: true,
                // inlineSource: '.(js|css)$', // embed all javascript and css inline
                // inject: 'body',
                // template: 'template.html',
                // chunksSortMode: 'auto'
                // chunksSortMode: 'dependency'
            // }),

            // new HtmlWebpackInlineSourcePlugin(),
        ],

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

                /*
                {
                    test: /\.html$/,
                    loader: "raw-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.html$/,
                    use: [ {
                        loader: 'html-loader',

                    } ],

                },
                */

                {
                    test: /\.html/i,
                    // loader: "html-loader",
                    loader: "raw-loader",

                },



                // {
                // test: /\.icss$/,
                // loader: [ "to-string-loader", "css-loader" ]
                // loader: [ "to-string-loader", "css-loader" ]
                // loader: "raw-text-loader"
                // },

                // {
                // test: /\.iyml$/,
                // type: "json",
                // loader: [ "to-string-loader", "yaml-loader" ],
                // }
            ]
        }
    }
}

