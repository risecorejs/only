import { TKeys } from './types/index'

declare namespace Express {
  export interface Request {
    only(...keys: TKeys): any
  }
}
