import { TKeys } from './types'

declare global {
  namespace Express {
    export interface Request {
      only(...keys: TKeys): any
    }
  }
}
