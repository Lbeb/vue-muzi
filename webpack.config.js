const path = require('path');
// 引入插件
const htmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new VueLoaderPlugin(),
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: 'url-loader?limit=1000&name=[hash:8]-[name].[ext]'
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'file-loader'
      },
      {
        test: /\.js$/, use: 'babel-loader', exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  }
}