
var path = require('path');

module.exports = [
    {
        entry: './1d/main.js',
        devtool: "inline-sourcemap",
        output: {
          path: path.join(__dirname, "/1d/build"),
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
    }

];
