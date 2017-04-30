
var path = require('path');

module.exports = [
    {
        entry: './1d/main.js',
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
        entry: './2d/main.js',
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
    }
    // {
    //     entry: './3d/main.js',
    //     devtool: "inline-sourcemap",
    //     output: {
    //       path: path.join(__dirname, "/3d/build"),
    //       publicPath: "/",
    //       filename: "3d.js"
    //     },
    //     module: {
    //         loaders: [
    //             {
    //                 test: /\.js$/,
    //                 exclude: /(node_modules)/,
    //                 loader: 'babel-loader',
    //                 query: {
    //                     presets: ['es2015']
    //                 }
    //             }
    //         ]
    //     },
    //     resolve: {
    //         // you can now require('file') instead of require('file.coffee')
    //         extensions: ['', '.js', '.json']
    //     }
    // }

];
