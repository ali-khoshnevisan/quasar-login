import { ssrMiddleware } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/developing-ssr/ssr-middlewares
export default ssrMiddleware(({ app, resolve /*, resolveUrlPath, publicPath, render */ }) => {
  app.all(resolve.urlPath('*'), (req, _, next) => {
    console.log('someone requested:', req.url)
    next()
  })
})
