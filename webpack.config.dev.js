import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

//http://jpsierens.com/tutorial-react-redux-webpack/

export default {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  entry: [
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		'react-hot-loader/patch',
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
		// Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.template.html',
      inject: true, // tells webpack to inject any necessary script tags
			filename: 'index.html'
    }),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()//,
		// new webpack.DefinePlugin({
		// 	'process.env.NODE_ENV': JSON.stringify('development')
		// })
	],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']},
			{test: /\.json?$/, loader: 'json'},
			{test: /\.scss$/, loader: 'style!css!sass?modules&localIdentName=[name]---[local]---[hash:base64:5]'},
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
    	{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  }
}