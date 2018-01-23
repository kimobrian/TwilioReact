const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

module.exports = {
    devtool: "source-map",
    entry: __dirname + "/app/app.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: [/node_modules/]
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    // {
                    //     loader: "sass-loader" // compiles Sass to CSS
                    // }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: __dirname + "/app/index.html",
            inject: "body"
        }),
        new webpack.BannerPlugin("React Twilio"),
        // new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("[name]-[hash].cssi")
    ]
};
