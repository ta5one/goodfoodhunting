function logger(req, res, next) {
    // console.log(req.url)
    // console.log(req.method)
    // console.log(new Date())
  
    console.log(`${req.method} ${req.url} ${new Date().toISOString()}`)
    next()
  }
  
  module.exports = logger