"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // ESModules
const cors_1 = __importDefault(require("cors"));
const htmlHome_1 = require("./config/htmlHome");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const server_routes_1 = __importDefault(require("./routes/server.routes"));
const channel_routes_1 = __importDefault(require("./routes/channel.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: ['https://discordiaa.vercel.app', 'http://localhost:3000'], optionsSuccessStatus: 200 }));
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.send(htmlHome_1.htmlHome);
});
app.use('/api/discordia/user', user_routes_1.default);
app.use('/api/discordia/channel', channel_routes_1.default);
app.use('/api/discordia/server', server_routes_1.default);
exports.default = app;
