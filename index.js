"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = __importDefault(require("merge"));
const flat_1 = __importDefault(require("flat"));
const lodash_1 = __importDefault(require("lodash"));
/**
 * ONLY
 * @param body: {IFields},
 * @param keys: {TKeys}
 * @return {null | IFields}
 */
function default_1(body, keys) {
    const fields = {};
    for (const key of keys) {
        if (typeof key === 'string') {
            if (key.includes('.')) {
                const { has, value } = getValueByBodyKey({ [key]: eval('body.' + key.replaceAll('.', '?.')) }, key);
                if (has) {
                    merge_1.default.recursive(fields, flat_1.default.unflatten({ [key]: value }));
                }
            }
            else {
                const { has, value } = getValueByBodyKey(body, key);
                if (has) {
                    fields[key] = value;
                }
            }
        }
        else if (key.constructor === Object) {
            for (const [_key, keysOrFormatter] of Object.entries(key)) {
                if (typeof keysOrFormatter === 'function') {
                    fields[_key] = keysOrFormatter(body[_key], body);
                }
                else {
                    const { has } = getValueByBodyKey(body, _key);
                    if (has) {
                        const only = require('./index').default;
                        fields[_key] = only(body[_key], Array.isArray(keysOrFormatter) ? keysOrFormatter : [keysOrFormatter]);
                    }
                }
            }
        }
    }
    return lodash_1.default.isEmpty(fields) ? null : fields;
}
exports.default = default_1;
/**
 * GET-VALUE-BY-BODY-KEY
 * @param body {IFields}
 * @param key {string}
 * @return {IResult}
 */
function getValueByBodyKey(body, key) {
    const result = {
        has: false,
        value: body[key]
    };
    if (result.value !== void 0) {
        result.has = true;
    }
    return result;
}
