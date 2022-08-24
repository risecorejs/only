import { IFields } from '../interfaces'

export type TKeys = (string | { [key: string]: string | TKeys | ((val?: any, body?: IFields) => any) })[]
