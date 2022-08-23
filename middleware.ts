import express from 'express'

import only from './index'

export = function () {
  return function (req: express.Request, res: express.Response, next: express.NextFunction) {
    req.only = (...keys: any[]) => {
      if (Array.isArray(keys[0])) {
        keys = keys[0]
      }

      return only(req, keys)
    }

    next()
  }
}
