import merge from 'merge'
import flat from 'flat'
import _ from 'lodash'

import { FieldsInterface, ResultInterface } from './interfaces'

export = main

/**
 * MAIN
 * @param body: {FieldsInterface},
 * @param keys: {(string | object)[]}
 * @return {null | FieldsInterface}
 */
function main(body: FieldsInterface, keys: (string | object)[]): null | FieldsInterface {
  const fields: FieldsInterface = {}

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
          merge.recursive(
            fields,
            flat.unflatten({
              [key]: value
            })
          )
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
        } else if (Array.isArray(keysOrFormatter)) {
          const { has } = getValueByBodyKey(body, _key)

          if (has) {
            fields[_key] = main(body[_key], keysOrFormatter)
          }
        }
      }
    }
  }

  return _.isEmpty(fields) ? null : fields
}

/**
 * GET-VALUE-BY-BODY-KEY
 * @param body {FieldsInterface}
 * @param key {string}
 * @return {ResultInterface}
 */
function getValueByBodyKey(body: FieldsInterface, key: string): ResultInterface {
  const result: ResultInterface = {
    has: false,
    value: body[key]
  }

  if (result.value !== void 0) {
    result.has = true
  }

  return result
}
