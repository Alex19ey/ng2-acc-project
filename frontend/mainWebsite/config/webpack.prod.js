"use strict";

const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev
const helpers = require('./helpers');

/**
 * Webpack Plugins
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const AotPlugin = require('@ngtools/webpack').AotPlugin;


module.exports = function (options) {
    return webpackMerge(commonConfig(options), {

        devtool: 'source-map',

        output: {

            // The output directory as absolute path (required).
            path: options.distAbs,

            // IMPORTANT: You must not specify an absolute path here!
            filename: '[name].[chunkhash].js',


            // The filename of the SourceMaps for the JavaScript files.
            sourceMapFilename: '[name].[chunkhash].map',


            // The filename of non-entry chunks as relative path
            // inside the output.path directory.
            chunkFilename: '[id].[chunkhash].chunk.js'

        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: '@ngtools/webpack',
                },

                // Extract CSS files from .src/styles directory to external CSS file
                {
                    test: /\.s?css$/,
                    loader: ExtractTextPlugin.extract({
                        fallbackLoader: 'style-loader',
                        loader: [
                            {
                                loader: 'css-loader',
                                query: {
                                    import: true,
                                    url: false,
                                    minimize: true
                                }
                            },
                            'sass-loader'
                        ]
                    }),
                    include: [helpers.rootJoin(options.src, 'styles')]
                }
            ]
        },

        plugins: [
            new ExtractTextPlugin('[name].[contenthash].css'),

            // Description: Plugin to replace a standard webpack chunkhash with md5.
            new WebpackMd5Hash(),

            new UglifyJsPlugin({
                beautify: false, //prod
                output: {
                    comments: false
                }, //prod
                mangle: {
                    screw_ie8: true
                }, //prod
                compress: {
                    screw_ie8: true,
                    warnings: false,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                    negate_iife: false // we need this for lazy v8
                },
            }),

            new AotPlugin({
                tsConfigPath:  helpers.rootJoin('tsconfig-aot.json'),
                entryModule: helpers.rootJoin('src/app/app.module.ts') + '#AppModule'
            })
        ]
    });
}
