const path = require("path");
const BrowserSyncPlugin = require('browser-sync-webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: {
      app:'./src/index.js',
        bundle: [
            "webpack/hot/dev-server",
            (`${__dirname}/src/index.js`)
        ]
    },
    output: {
        filename:'[name].js',
        path: path.resolve(__dirname,'./dist'),
        publicPath: '/dist'
    },
    devServer:{
        overlay: true,
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test:/\.scss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }

        ],

    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 8080,
            files:['*.html'],
            server: { baseDir: ['dist'] }
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
    ],

};