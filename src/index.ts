import merge from 'merge'
import flat from 'flat'
import _ from 'lodash'

import * as declarations from '../declarations'

import getValueFromBody from './utils/get-value-from-body'

export default async function <A = any>(body: Record<string, any>, keys: declarations.TKeys<A>) {
  const values: Record<string, any> = {}

  for (const key of keys) {
    if (typeof key === 'string') {
      if (key.includes('.')) {
        const { exists, value } = getValueFromBody({ [key]: eval('body.' + key.replaceAll('.', '?.')) }, key)

        if (exists) {
          merge.recursive(values, flat.unflatten({ [key]: value }))
        }
      } else {
        const { exists, value } = getValueFromBody(body, key)

        if (exists) {
          values[key] = value
        }
      }
    } else if (key.constructor === Object) {
      for (const [_key, keysOrFormatter] of Object.entries(key)) {
        if (typeof keysOrFormatter === 'function') {
          values[_key] = keysOrFormatter(body[_key], body)
        } else {
          const { exists } = getValueFromBody(body, _key)

          if (exists) {
            const only = require('./index').default

            values[_key] = only(body[_key], Array.isArray(keysOrFormatter) ? keysOrFormatter : [keysOrFormatter])
          }
        }
      }
    }
  }

  return _.isEmpty(values) ? null : values
}
