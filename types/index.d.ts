import { IFields } from '../interfaces';
export declare type TKeys = (string | {
    [key: string]: string | TKeys | ((val?: any, body?: IFields) => any);
})[];
