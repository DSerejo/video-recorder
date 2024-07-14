const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
            'style-loader', // Injects styles into DOM
            'css-loader',   // Translates CSS into CommonJS
            'sass-loader'   // Compiles Sass to CSS
        ],
    },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      manifest: "./public/manifest.json",
    }),
  ],
  devServer: {
    static: './dist',
    hot: true,
    port: 3000,
    allowedHosts: "all",
    historyApiFallback: true
  },
  mode: 'development',
  devtool: 'source-map',
};