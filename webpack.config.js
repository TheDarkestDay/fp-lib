module.exports = {
  entry: './lib/index.ts',
  module: {
    rules: [
      {
        test: /\*.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts']
  },
  output: {
    fileName: 'bundle.js',
    path: './dist'
  }
};