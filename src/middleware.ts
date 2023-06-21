import express from 'express'

import * as declarations from '../declarations'

import only from './index'

export default function (req: express.Request, res: express.Response, next: express.NextFunction) {
  req.only = function (keys: declarations.TKeys) {
    return only(req.body, keys)
  }

  next()
}
