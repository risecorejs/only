import { FieldsInterface } from './interfaces';
export = only;
/**
 * ONLY
 * @param body: {FieldsInterface},
 * @param keys: {(string | object)[]}
 */
declare function only(body: FieldsInterface, keys: (string | object)[]): FieldsInterface | null;
