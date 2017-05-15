
var path = require('path');
const BabiliPlugin = require("babili-webpack-plugin");

// Workaround for remote server build & deploy problems
// npm skips installing devDependencies{} if NODE_ENV=="production"
// But webpack needs those deps to build! Sure there's a nicer way but #fornow:
const PRODUCTION_STR = "buildproduction"


if (process.env.NODE_ENV == PRODUCTION_STR)
  console.log("*** Building for PRODUCTION ****");
else
  console.log("*** Building for development ****");

module.exports = [
    {
        context: path.join(__dirname, "1d"),
        entry: './main.js',
        devtool: "inline-sourcemap",
        output: {
          path: path.join(__dirname, "/pub/1d/build"),
          publicPath: "/",
          filename: "1d.js"
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        },
        resolve: {
            // you can now require('file') instead of require('file.coffee')
            extensions: ['', '.js', '.json']
        },
        plugins: process.env.NODE_ENV != PRODUCTION_STR ? [] :
        [
          new BabiliPlugin({removeConsole:true}, {comments: false, sourceMap: false})
        ]
    },
    {
        context: path.join(__dirname, "2d"),
        entry: './main.js',
        devtool: "inline-sourcemap",
        output: {
          path: path.join(__dirname, "/pub/2d/build"),
          publicPath: "/",
          filename: "2d.js"
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        },
        resolve: {
            // you can now require('file') instead of require('file.coffee')
            extensions: ['', '.js', '.json']
        },
        plugins: process.env.NODE_ENV != PRODUCTION_STR ? [] :
                [
                  new BabiliPlugin({removeConsole:true}, {comments: false, sourceMap: false})
                ]
    },
    {
        context: path.join(__dirname, "3d"),
        entry: './main.js',
        devtool: "inline-sourcemap",
        output: {
          path: path.join(__dirname, "/pub/3d/build"),
          publicPath: "/",
          filename: "3d.js"
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        },
        resolve: {
            // you can now require('file') instead of require('file.coffee')
            extensions: ['', '.js', '.json']
        },
        plugins: process.env.NODE_ENV != PRODUCTION_STR ? [] :
        [
          new BabiliPlugin({removeConsole:true}, {comments: false, sourceMap: false})
        ]
    }
];
