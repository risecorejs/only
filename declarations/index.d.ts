export type TKeys<A = any> = (
  | keyof A
  | string
  | {
      [key in keyof A | string]:
        | ((val: any, body: any) => any)
        | ((val: any, body: any) => Promise<any>)
        | TKeys<A[key]>
    }
)[]
