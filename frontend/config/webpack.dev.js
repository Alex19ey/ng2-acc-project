'use strict';

const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev
const helpers = require('./helpers');


/**
 * Webpack Constants
 */
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;


module.exports = function (options) {
    return webpackMerge(commonConfig(options), {

        devtool: 'cheap-module-source-map',
        watch: true,

        output: {

            // The output directory as absolute path (required).
            path: options.distAbs,

            // Specifies the name of each output file on disk.
            // IMPORTANT: You must not specify an absolute path here!
            filename: '[name].js',

            // The filename of the SourceMaps for the JavaScript files.
            // They are inside the output.path directory.
            sourceMapFilename: '[file].map',

            // The filename of non-entry chunks as relative path
            // inside the output.path directory.
            chunkFilename: '[id].chunk.js',

            // library: 'ac_[name]',
            // libraryTarget: 'var',
            publicPath: '/static-files/'
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [
                        // { loader: 'ng-router-loader', options: {} },
                        { loader: 'awesome-typescript-loader?{configFileName: \'tsconfig.json\'}' },
                        { loader: 'angular2-template-loader' }
                    ],
                    exclude: [/\.(spec|e2e)\.ts$/]
                },

                // Extract CSS files from .src/styles directory to external CSS file
                {
                    test: /\.s?css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                import: true,
                                url: false,
                                minimize: false
                            }
                        },
                        'sass-loader'
                    ],
                    include: [helpers.rootJoin(options.src, 'styles')]
                }
            ]
        },

        plugins: [
            // new ExtractTextPlugin('[name].css')
        ],

        devServer: {
            contentBase: options.srcAbs,
            host: HOST,
            port: PORT,
            historyApiFallback: true,
            // inline: true,
            proxy: {
                '**': {
                    target: 'http://46.172.85.30:3262/',
                    // pathRewrite: {'^/api' : '}
                }
            },
            watchOptions: {
                aggregateTimeout: 100,
                poll: 1000,
                ignored: /node_modules/
            }
        },

        watchOptions: {
            aggregateTimeout: 100,
            poll: 1000,
            ignored: /node_modules/
        }
    });
}
