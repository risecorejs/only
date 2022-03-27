const only = require('./index')

module.exports = () => (req, res, next) => {
  req.only = (...keys) => {
    if (Array.isArray(keys)) {
      keys = keys[0]
    }

    return only(req.body, keys)
  }

  next()
}
