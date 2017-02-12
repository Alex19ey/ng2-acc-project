"use strict";

const webpack = require('webpack');
const helpers = require('./helpers');

/**
 * Webpack Plugins
 */
const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');


module.exports = function (options) {
    return {

        // Cache generated modules and chunks to improve performance for multiple incremental builds.
        // This is enabled by default in watch mode.
        // cache: false,

        entry: {
            polyfills: `./${options.src}/polyfills.ts`,
            main: options.isAOT ? `./${options.src}/main.aot.ts` : `./${options.src}/main.ts`
        },

        resolve: {
            extensions: ['.ts', '.js', '.json'],

            // An array of directory names to be resolved to the current directory
            modules: [options.srcAbs, helpers.rootJoin('node_modules')],

        },

        module: {
            rules: [
                {
                    test: /\.json$/,
                    use: 'json-loader'
                },
                {
                    test: /\.s?css$/,
                    use: ['css-to-string-loader', 'css-loader', 'sass-loader'],
                    exclude: [helpers.rootJoin(`${options.src}/styles`)] // exclude folder with global styles
                },
                {
                    test: /\.html$/,
                    use: 'raw-loader',
                    exclude: [helpers.rootJoin(`${options.src}/index.html`)]
                },

                /* File loader for supporting images, for example, in CSS files.
                 */
                {
                    test: /\.(jpg|png|gif)$/,
                    use: 'file-loader'
                },

            ],
        },

        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),  // renamed NoErrorsPlugin

            new WebpackNotifierPlugin(),

            new AssetsPlugin({
                path: options.distAbs,
                filename: 'webpack-assets.json',
                prettyPrint: true
            }),

            new CheckerPlugin(),

            // Description: Shares common code between the pages.
            // It identifies common modules and put them into a commons chunk.
            new CommonsChunkPlugin({
                name: 'polyfills',
                chunks: ['polyfills']
            }),
            // This enables tree shaking of the vendor modules
            new CommonsChunkPlugin({
                name: 'vendor',
                chunks: ['main'],
                minChunks: module => /node_modules\//.test(module.resource)
            }),
            // Specify the correct order the scripts will be injected in
            new CommonsChunkPlugin({
                name: ['polyfills', 'vendor'].reverse()
            }),

            new ContextReplacementPlugin(
              // The (\\|\/) piece accounts for path separators in *nix and Windows
              /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
              options.srcAbs, // location of your src
              {
                // our Angular Async Route paths relative to this root directory
              }
            ),

            // Description: Copy files and directories in webpack.
            new CopyWebpackPlugin([
                {from: `${options.src}/assets`, to: `assets`},
                // {from: `node_modules/bootstrap/dist/css/bootstrap.min.css`, to: `assets`}
            ]),

             // Description: Simplifies creation of HTML files to serve your webpack bundles.
             // This is especially useful for webpack bundles that include a hash in the filename
             // which changes every compilation.
            new HtmlWebpackPlugin({
                template: `./${options.src}/index.html`,
                chunksSortMode: 'dependency',
                inject: 'head',
                minify: {
                    minifyCSS: true
                }
            }),

            // Description: Enhances html-webpack-plugin functionality
            // with different deployment options for your scripts including:
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer'
            })
        ]
    };
}
