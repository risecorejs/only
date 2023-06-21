import * as declarations from './declarations'

declare global {
  namespace Express {
    interface Request {
      only: <A = any, V = null | Record<string, any>>(keys: declarations.TKeys<A>) => Promise<V>
    }
  }
}
