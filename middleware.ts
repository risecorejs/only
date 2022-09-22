import express from 'express'

import only from './index'

import { TKeys } from './types'

/**
 * MIDDLEWARE
 * @return {express.Handler}
 */
export default function (): express.Handler {
  return function (req: express.Request, res: express.Response, next: express.NextFunction) {
    req.only = (...keys: TKeys | [TKeys]) => {
      if (Array.isArray(keys[0])) {
        keys = keys[0]
      }

      return only(req.body, <TKeys>keys)
    }

    next()
  }
}

declare global {
  namespace Express {
    export interface Request {
      only(...keys: TKeys | [TKeys]): any
    }
  }
}
