const proxy = require('http-proxy-middleware');
const {
    proxy8090,
    proxy53000
} = require('./utils/proxy_variable.js');

module.exports = function (app) {
    app.use(
        proxy(`/${proxy8090}`, { //遇见/proxy8090这个前缀的请求，就会触发该代理配置
            target: `http://localhost:8090`, //请求转发给谁
            changeOrigin: true, //控制服务器收到的请求头中Host字段的值，Host字段表示本次请求从哪里发出的，默认false
            pathRewrite: {
                [`^/${proxy8090}`]: '' //重写请求路径
            }
        }),
        proxy(`/${proxy53000}`, {
            target: `http://localhost:53000`,
            changeOrigin: true,
            pathRewrite: {
                [`^/${proxy53000}`]: ''
            }
        })
    )
}