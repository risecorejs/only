const flat = require('flat')

module.exports = () => (req, res, next) => {
  req.only = (keys, emptyResult) => only(req.body, keys, emptyResult)

  next()
}

function only(requestData, keys, emptyResult = null) {
  const flatRequestData = flat.flatten(requestData, { safe: true })
  const flatKeys = []

  function flattenKeys(keys, prevKey = '') {
    for (const key of keys) {
      if (typeof key === 'string') {
        flatKeys.push(prevKey ? `${prevKey}.${key}` : key)
      } else {
        for (const [_key, _keys] of Object.entries(key)) {
          flattenKeys(_keys, prevKey ? `${prevKey}.${_key}` : _key)
        }
      }
    }
  }

  flattenKeys(keys)

  const siftedFlatRequestData = {}

  for (const flatKey of flatKeys) {
    const value = flatRequestData[flatKey]

    if (value !== undefined) {
      siftedFlatRequestData[flatKey] = value
    }
  }

  const siftedRequestData = flat.unflatten(siftedFlatRequestData)

  return Object.keys(siftedRequestData).length ? siftedRequestData : emptyResult
}
