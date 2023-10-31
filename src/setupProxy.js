const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api', // Specify the API endpoint you want to proxy
    createProxyMiddleware({
      target: 'https://mosquepay.org/mosquepayapi/v1/api/', // Your API URL
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove the '/api' prefix from the request path
      },
    })
  )
}
