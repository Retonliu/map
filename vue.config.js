module.exports = {
    devServer: {
        compress: true,
        disableHostCheck: true,
        //proxy: 'https://openapi.yiban.cn' //配置服务器的域名在这里，防止出现跨域问题
    },
    publicPath:'./', 
    configureWebpack:{ 
        resolve: { 
            alias: { 'assets': '@/assets', 'common': '@/common', 'components': '@/components', 'network': '@/network', 'views': '@/views', 'plugins': '@/plugins', } 
        } 
    }
}