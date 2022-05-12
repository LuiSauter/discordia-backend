"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    PORT: process.env.PORT != null ? process.env.PORT : 3000,
    MONGO_URI: process.env.URI_CLUSTER_DB != null ? process.env.URI_CLUSTER_DB : '',
    NODE_ENV: process.env.NODE_ENV != null ? process.env.NODE_ENV : ''
};
