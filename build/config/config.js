"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    PORT: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000,
    MONGO_URI: (_b = process.env.URI_CLUSTER_DB) !== null && _b !== void 0 ? _b : '',
    NODE_ENV: (_c = process.env.NODE_ENV) !== null && _c !== void 0 ? _c : ''
};
