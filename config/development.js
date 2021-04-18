const config = {
  web: {
    host: 'http://localhost',
    port: 9526
  },
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    // 设置主机地址
    host: '0.0.0.0',
    // 设置默认端口
    // port: 8088,
    open: false, // 配置自动启动浏览器
    // 设置代理
    proxy: {
      '/api/lowCode': {
        target: 'http://120.77.218.141:9993/',
        changeOrigin: true
      },
      '/api/code': {
        target: 'http://120.77.218.141:9999/',
        changeOrigin: true
      }
    }
  }
}

config.devServer.port = config.web.port || '9526'
module.exports = config
