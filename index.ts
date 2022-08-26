import merge from 'merge'
import flat from 'flat'
import _ from 'lodash'

import { IFields, IResult } from './interfaces'
import { TKeys } from './types'

/**
 * ONLY
 * @param body: {IFields},
 * @param keys: {TKeys}
 * @return {null | IFields}
 */
export default function (body: IFields, keys: TKeys): null | IFields {
  const fields: IFields = {}

  for (const key of keys) {
    if (typeof key === 'string') {
      if (key.includes('.')) {
        const { has, value } = getValueByBodyKey({ [key]: eval('body.' + key.replaceAll('.', '?.')) }, key)

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
          fields[_key] = keysOrFormatter(body[_key], body)
        } else {
          const { has } = getValueByBodyKey(body, _key)

          if (has) {
            const only = require('./index').default

            fields[_key] = only(body[_key], Array.isArray(keysOrFormatter) ? keysOrFormatter : [keysOrFormatter])
          }
        }
      }
    }
  }

  return _.isEmpty(fields) ? null : fields
}

/**
 * GET-VALUE-BY-BODY-KEY
 * @param body {IFields}
 * @param key {string}
 * @return {IResult}
 */
function getValueByBodyKey(body: IFields, key: string): IResult {
  const result: IResult = {
    has: false,
    value: body[key]
  }

  if (result.value !== void 0) {
    result.has = true
  }

  return result
}
