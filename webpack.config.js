const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = env => ({
  entry: './src/index.js',
  mode: 'production',
  devtool: 'source-map',
  externals: {
    lodash: {
      amd: 'lodash',
      commonjs: 'lodash',
      commonjs2: 'lodash',
      root: '_',
    },
    qs: {
      amd: 'Qs',
      commonjs: 'Qs',
      commonjs2: 'Qs',
      root: 'Qs',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: 'babel-loader',
      },
    ],
  },
  output: {
    filename: 'linebot.js',
    globalObject: 'this',
    library: 'linebot',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],

  // development
  ...(env.production ? {} : {
    mode: 'development',
    devtool: 'inline-source-map',
    optimization: {
      usedExports: true,
    },
  }),
})
