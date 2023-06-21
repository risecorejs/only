import * as declarations from './declarations'

declare global {
  namespace Express {
    interface Request {
      only: <A = any>(keys: declarations.TKeys<A>) => Promise<null | Record<string, any>>
    }
  }
}
