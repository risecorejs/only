import express from 'express'

import { TKeys } from './types'
import only from './index'

/**
 * MIDDLEWARE
 * @return {express.Handler}
 */
export default function (): express.Handler {
  return function (req: express.Request, res: express.Response, next: express.NextFunction) {
    req.only = (...keys: TKeys) => {
      if (Array.isArray(keys[0])) {
        keys = keys[0]
      }

      return only(req, keys)
    }

    next()
  }
}
