import {SRC,DIST,PORT} from './constants';
import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: SRC + 'index.pug',
    filename: 'index.html',
    inject: 'body',
    minify: {
        removeComments: true,
        collapseWhitespace: true
    }
});

module.exports = {
    entry: [
        SRC + 'index.js' 
    ],
    output: {
        filename: "main.js",
        path: DIST,
        publicPath: "/"
    },    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test:   /\.css/,
                use: ['style-loader', 'css-loader']
            },            
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: ['file-loader?name=images/[name].[ext]', 'img-loader?progressive=true']
            },            
            {
                test: /\.pug$/,
                use: 'pug-loader?pretty=true'
            }
        ]
    },
    resolve: {
        modules: ['app', 'node_modules']
    },
    plugins: [
        HTMLWebpackPluginConfig,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),            
            PRODUCTION: JSON.stringify(true)
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
        })
    ]
}