module.exports = {
    devServer: {
        compress: true,
        disableHostCheck: true,
    },
    proxyTable: {
        '/api': {
            target: 'https://openapi.yiban.cn',
            changeOrigin: true,
            pathRewrite: {
                '^api': ''
            }
        }
    }
}