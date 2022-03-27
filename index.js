const merge = require('merge')
const flat = require('flat')
const _ = require('lodash')

module.exports = only

/**
 * ONLY
 * @param body {Object}
 * @param keys {any[]}
 * @returns {Object}
 */
function only(body, keys) {
  const fields = {}

  for (const key of keys) {
    if (typeof key === 'string') {
      if (key.includes('.')) {
        const { has, value } = getValueByBodyKey(
          {
            [key]: eval('body.' + key.replaceAll('.', '?.'))
          },
          key
        )

        if (has) {
          merge.recursive(fields, flat.unflatten({ [key]: value }))
        }
      } else {
        const { has, value } = getValueByBodyKey(body, key)

        if (has) {
          fields[key] = value
        }
      }
    } else if (key.constructor === Object) {
      for (const [_key, keysOrFormatter] of Object.entries(key)) {
        if (typeof keysOrFormatter === 'function') {
          fields[_key] = keysOrFormatter(body[_key], only)
        } else if (Array.isArray(keysOrFormatter)) {
          const { has } = getValueByBodyKey(body, _key)

          if (has) {
            fields[_key] = only(body[_key], keysOrFormatter)
          }
        }
      }
    }
  }

  return _.isEmpty(fields) ? null : fields
}

/**
 * GET-VALUE-BY-BODY-KEY
 * @param body {Object}
 * @param key {string}
 * @returns {{has: boolean, value: any}}
 */
function getValueByBodyKey(body, key) {
  const result = {
    has: false,
    value: body[key]
  }

  if (result.value !== void 0) {
    result.has = true
  }

  return result
}
