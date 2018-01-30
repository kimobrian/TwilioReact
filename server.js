require("dotenv").config();
var path = require("path");
var express = require("express");
var webpack = require("webpack");
var faker = require("faker");

var app = express();
if(process.env.NODE_ENV === "DEV") { // Configuration for development environment
    var webpackDevMiddleware = require("webpack-dev-middleware");
    var webpackHotMiddleware = require("webpack-hot-middleware");
    var webpackConfig = require("./webpack.config.js");
    const webpackCompiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(webpackCompiler, {
      hot: true
    }));
    app.use(webpackHotMiddleware(webpackCompiler));
    app.use(express.static(path.join(__dirname, "app")));
} else if(process.env.NODE_ENV === "PROD") { // Configuration for production environment
    app.use(express.static(path.join(__dirname, "dist")));
}

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Express server listening on *:" + port);
});