
var path = require('path');

// test

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
        }
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
        }
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
        }
    }
];
