module.exports = {
    lintOnSave : false,   //关闭语法检查

    //开启代理服务器（方式一）
    //devServer: {
    //    proxy: 'http://10.10.3.191:8080/'
    //}

    //开启代理服务器（方式二）
    devServer: {
        proxy: {
            '/StudentAction':{
                target: 'http://10.10.3.191:8080/',
                pathRewrite: {'^/StudentAction':''},
                //ws: true,  //用于支持websocket,默认值是true
                //changeOrigin: true //用于控制请求头中的host值，默认为true
            },
            '/CarAction':{
                target: 'http://10.10.3.191:8081/',
                pathRewrite: {'^/CarAction':''},
                //ws: true,  //用于支持websocket,默认值是true
                //changeOrigin: true //用于控制请求头中的host值，默认为true
            }
        }
    }
}