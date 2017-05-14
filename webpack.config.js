
var path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


if (process.env.NODE_ENV == 'production')
  console.log("*** Building for PRODUCTION ****");
else
  console.log("*** Building for development **** ("+process.env.NODE_ENV+")");

module.exports = [
    {
        context: path.join(__dirname, "1d"),
        entry: './main.js',
        devtool: "inline-sourcemap",
        output: {
          path: path.join(__dirname, "/public_html/1d/build"),
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
        plugins: process.env.NODE_ENV != 'production' ? [] :
                [
                  new UglifyJSPlugin()
                ]
    },
    {
        context: path.join(__dirname, "2d"),
        entry: './main.js',
        devtool: "inline-sourcemap",
        output: {
          path: path.join(__dirname, "/public_html/2d/build"),
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
        plugins: process.env.NODE_ENV != 'production' ? [] :
                [
                  new UglifyJSPlugin()
                ]
    },
    {
        context: path.join(__dirname, "3d"),
        entry: './main.js',
        devtool: "inline-sourcemap",
        output: {
          path: path.join(__dirname, "/public_html/3d/build"),
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
        plugins: process.env.NODE_ENV != 'production' ? [] :
                [
                  new UglifyJSPlugin()
                ]
    }
];
