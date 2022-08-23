"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const merge_1 = __importDefault(require("merge"));
const flat_1 = __importDefault(require("flat"));
const lodash_1 = __importDefault(require("lodash"));
/**
 * ONLY
 * @param body: {FieldsInterface},
 * @param keys: {(string | object)[]}
 */
function only(body, keys) {
    const fields = {};
    for (const key of keys) {
        if (typeof key === 'string') {
            if (key.includes('.')) {
                const { has, value } = getValueByBodyKey({
                    [key]: eval('body.' + key.replaceAll('.', '?.'))
                }, key);
                if (has) {
                    merge_1.default.recursive(fields, flat_1.default.unflatten({
                        [key]: value
                    }));
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
                else if (Array.isArray(keysOrFormatter)) {
                    const { has } = getValueByBodyKey(body, _key);
                    if (has) {
                        fields[_key] = only(body[_key], keysOrFormatter);
                    }
                }
            }
        }
    }
    return lodash_1.default.isEmpty(fields) ? null : fields;
}
/**
 * GET-VALUE-BY-BODY-KEY
 * @param body {FieldsInterface}
 * @param key {string}
 * @return Result
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
module.exports = only;
