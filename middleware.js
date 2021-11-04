const only = require('./only')

module.exports = () => main

/**
 * MAIN
 * @param req {Object}
 * @param res {Object}
 * @param next {Function}
 */
function main(req, res, next) {
  req.only = (...args) => {
    const arg1 = args[0]
    const arg1IsArray = Array.isArray(arg1)

    const keys = arg1IsArray ? arg1 : args
    const plug = arg1IsArray ? args[1] : void 0

    return only(req.body, keys, plug)
  }

  next()
}
