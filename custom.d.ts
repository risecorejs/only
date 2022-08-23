declare namespace Express {
  export interface Request {
    only(...keys: any[]): any
  }
}
