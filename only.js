const flat = require('flat')

module.exports = main

/**
 * MAIN
 * @param requestData {Object}
 * @param keys {string[]}
 * @param plug {any?}
 * @returns {Object|void}
 */
function main(requestData, keys, plug) {
  const flatRequestData = flat.flatten(requestData, { safe: true })
  const flatKeys = flattenKeys(keys)

  const siftedFlatRequestData = {}

  /**
   * SET-SIFTED-FLAT-REQUEST-DATA
   * @param flatKey {string}
   * @param callback {Function}
   * @returns {void}
   */
  const setSiftedFlatRequestData = (flatKey, callback) => {
    const value = flatRequestData[flatKey]

    const _value = callback ? callback(value) : value

    if (_value !== void 0) {
      siftedFlatRequestData[flatKey] = _value
    }
  }

  for (const arrayOfFlatKey of flatKeys) {
    const arrayOfFlatKeyIsArray = Array.isArray(arrayOfFlatKey)

    const flatKey = arrayOfFlatKeyIsArray ? arrayOfFlatKey[0] : arrayOfFlatKey
    const callback = arrayOfFlatKeyIsArray ? arrayOfFlatKey[1] : void 0

    setSiftedFlatRequestData(flatKey, callback)
  }

  const siftedRequestData = flat.unflatten(siftedFlatRequestData)

  return Object.keys(siftedRequestData).length ? siftedRequestData : plug
}

/**
 * FLATTEN-KEYS
 * @param keys
 * @returns {string[]}
 */
function flattenKeys(keys) {
  const flatKeys = []

  /**
   * RECURSION
   * @param keys {(string|Object)[]}
   * @param prevKey {string?}
   */
  const recursion = (keys, prevKey) => {
    for (const key of keys) {
      if (typeof key === 'string') {
        flatKeys.push(generateKey(prevKey, key))
      } else {
        for (const [_key, callbackOrKeys] of Object.entries(key)) {
          const _prevKey = generateKey(prevKey, _key)

          if (typeof callbackOrKeys === 'function') {
            flatKeys.push([_prevKey, callbackOrKeys])
          } else {
            recursion(callbackOrKeys, _prevKey)
          }
        }
      }
    }
  }

  recursion(keys)

  return flatKeys
}

/**
 * GENERATE-KEY
 * @param prevKey {string}
 * @param key {string}
 * @returns {string}
 */
function generateKey(prevKey, key) {
  return prevKey ? prevKey + '.' + key : key
}
