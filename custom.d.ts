declare namespace Express {
  export interface Request {
    only(...keys: (string | object)[]): any
  }
}
