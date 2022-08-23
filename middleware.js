"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const index_1 = __importDefault(require("./index"));
module.exports = function () {
    return function (req, res, next) {
        req.only = (...keys) => {
            if (Array.isArray(keys[0])) {
                keys = keys[0];
            }
            return (0, index_1.default)(req, keys);
        };
        next();
    };
};
