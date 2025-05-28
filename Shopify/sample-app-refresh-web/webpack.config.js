const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = (env) => {
    return {
        mode: 'development',
        entry: './src/index.tsx',
        devtool : 'inline-source-map',
        output: {
            path: path.resolve(__dirname, 'build'), // output to the 'build' folder
            filename: 'bundle.js',
        },
        module: {
            rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                  { from: 'public', to: '.' } // copy all files from public to the root of the output directory
                ]
              })
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, 'build'),
            },
            open: true,
            port: 3000,
            server: 'https',
            allowedHosts: "all",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
        },
        devtool: 'inline-source-map'
    };
};