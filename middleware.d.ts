import express from 'express';
import { TKeys } from './types';
/**
 * MIDDLEWARE
 * @return {express.Handler}
 */
export default function (): express.Handler;
declare global {
    namespace Express {
        interface Request {
            only(...keys: TKeys | TKeys[]): any;
        }
    }
}
