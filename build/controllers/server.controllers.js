"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServer = exports.createServer = exports.getServer = exports.allServers = void 0;
const allServers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.sendStatus(204);
    }
    catch (error) {
        res.sendStatus(406);
    }
});
exports.allServers = allServers;
const getServer = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.sendStatus(204);
    }
    catch (error) {
        res.sendStatus(406);
    }
});
exports.getServer = getServer;
const createServer = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.sendStatus(201);
    }
    catch (error) {
        res.sendStatus(406);
    }
});
exports.createServer = createServer;
const deleteServer = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.sendStatus(200);
    }
    catch (error) {
        res.sendStatus(406);
    }
});
exports.deleteServer = deleteServer;
