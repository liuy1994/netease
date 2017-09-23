module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader','autoprefixer-loader' ]
      }
    ]
  },
  entry: './src/app.js',
  output: {
    filename: './dist/bundle.js'
  }
}