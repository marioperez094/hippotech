const { environment } = require('@rails/webpacker')

const path = require('path')

const customConfig = {
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '..', '..', 'app/javascript/src'),
      '@components': path.resolve(__dirname, '..', '..', 'app/javascript/src/components')
    }
  }
}

environment.config.merge(customConfig);

module.exports = environment