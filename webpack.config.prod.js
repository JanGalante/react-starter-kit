import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map', //highest quality sourcemaps
  noInfo: false,
  entry: {
		// [path.resolve(__dirname, 'src/index')]
		vendor: path.resolve(__dirname, 'src/vendor'),
		main: path.resolve(__dirname, 'src/index')
	},
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'), //write to distribution folder
    publicPath: '/',
		// we can no loner use 'bundle.js' here since we generate many files dynamicly.
		// Name tells that we want the name in the entry, chunkhash use a variable created by WebpackMd5Hash
    filename: '[name].[chunkhash].js'
  },
  plugins: [
		// Generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),

		// Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),

		// Use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so that they're cached separately.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor' // vendor correspond to the name 'vendor' in the entry
    }),

		// Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
			minify: { // minify html output
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
			// tells webpack to inject any necessary script tags
      inject: true,
			// Properties you define here are available in index.html
      // using htmlWebpackPlugin.options.varName
      trackJSToken: '1324b7c1a05943b89b2662514b979ef5'
    }),

		// Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

		// Minify JS
    new webpack.optimize.UglifyJsPlugin()
	],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      // {test: /\.css$/, loaders: ['style','css']} // we dont need the style loader any more
			{test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')} //also configured to generate sourcemaps
    ]
  }
}