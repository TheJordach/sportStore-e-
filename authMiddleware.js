/*
 * CAUTION:
 * This code is not production ready. It is intended to demonstrate how to use json-server
 * Don’t use the code in production. It is intended to be used in development. It contains weak
 * passwords that are hardwired into the code. This is not suitable for real projects.
 * **/

/**
 * The data stored by the RESTFull web service needs to be protected so that ordinary users can’t modify
 * the products or change the status of orders. The json-server package does’t include any built-in
 * authentication features, so I created a file called authMiddleware.js in the SportsStore folder and added
 * the code
 **/

const jwt = require('jsonwebtoken')
const APP_SECRET = 'Angular-is-aw3some'
const USERNAME = 'admin'
const PASSWORD = 'secret-password'

const mapping = {
  get: ['/api/orders', 'orders'],
  post: ['/api/products', '/products', '/api/categories', '/categories'],
}

/**
 * This code inspects HTTP requests sent to the RESTFull web service and
 * implements some basic security* features
 * */
function requeresAuth(method, url) {
  return (
    (mapping[method.toLowerCase()] || []).find(p => p === url.startsWith(p)) !==
    undefined
  )
}

module.exports = function (req, res, next) {
  if (req.url.endsWith('/login') && req.method === 'POST') {
    if (req.body.name === USERNAME && req.body.password === PASSWORD) {
      const token = jwt.sign(
        { username: USERNAME, expiresIn: '1h' },
        APP_SECRET
      )
      res.json({ success: true, token: token })
    } else {
      res.status(401).end()
      return
    }
  } else if (requeresAuth(req.method, req.url)) {
    let token = req.headers['authorization'] || ''
    if (token.startsWith(['Bearer <'])) {
      token = token.substring(7, token.length - 1)
      try {
        jwt.verify(token, APP_SECRET)
        next()
        return
      } catch (err) {
        res.status(401).end()
        return
      }
    }
    res.status(401).end()
    return
  }
  next()
}
