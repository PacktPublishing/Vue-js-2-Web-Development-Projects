const merge = require('webpack-merge')
const common = require('./common')

module.exports = merge(common, {
  entry: './src/entry-client',
  output: {
    filename: 'build.js',
  },
})
