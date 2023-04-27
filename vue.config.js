// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const path = require('path')
// const host = '0.0.0.0'
const port = 80
module.exports = {
    // configureWebpack:{
    //     plugins: [new BundleAnalyzerPlugin()],
    //     resolve:{
    //         alias:{
                
    //         }
    //     }
    // },
    productionSourceMap: false,
    devServer: {
        // proxy: "http://localhost:7777"
        // host: host,
        port: port,
        hotOnly: true,
        disableHostCheck: true,
        clientLogLevel: 'warning',
        inline: true,
        headers: {
          'Access-Control-Allow-Origin': 'GET, POST',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        },
      },
    // publicPath : '/',
    // outputDir: 'dist',
};