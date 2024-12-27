"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("../utils/logger"));
const logging = (0, morgan_1.default)((tokens, req, res) => {
    const status = tokens.status(req, res);
    const message = [
        tokens.method(req, res),
        tokens.url(req, res),
        status,
        `${tokens['response-time'](req, res)} ms`,
        '-',
        `${tokens.res(req, res, 'content-length') || 0} bytes`,
    ].join(' ');
    if (status >= 400) {
        logger_1.default.error(message.trim());
    }
    else {
        logger_1.default.info(message.trim());
    }
    return null;
});
exports.default = logging;
