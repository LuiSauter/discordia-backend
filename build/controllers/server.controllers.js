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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServer = exports.invitation = exports.createServer = exports.getServer = exports.allServers = void 0;
const server_1 = __importDefault(require("../models/server"));
const channel_1 = __importDefault(require("../models/channel"));
const user_1 = __importDefault(require("../models/user"));
const message_1 = __importDefault(require("../models/message"));
const allServers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const servers = yield server_1.default.find({});
        res.status(200).json(servers);
    }
    catch (error) {
        res.sendStatus(406);
    }
});
exports.allServers = allServers;
const getServer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const server = yield server_1.default.findById(req.params.id).populate('channels');
        res.status(200).json(server);
    }
    catch (error) {
        res.sendStatus(406);
    }
});
exports.getServer = getServer;
const createServer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serverName, userId, image } = req.body;
        console.log(req.body);
        const newServer = yield server_1.default.create({
            serverName,
            users: [userId],
            admin: userId,
            channels: [],
            image
        });
        yield newServer.save();
        const defaultChannelOne = yield channel_1.default.create({
            channelName: 'bienvenida-y-reglas',
            serverId: newServer._id,
            section: 'información',
            messages: [],
            owner: [userId]
        });
        yield defaultChannelOne.save();
        const defaultChannelTwo = yield channel_1.default.create({
            channelName: 'general',
            serverId: newServer._id,
            section: 'canales de texto',
            messages: [],
            owner: [userId]
        });
        yield defaultChannelTwo.save();
        const defaultChannelThree = yield channel_1.default.create({
            channelName: 'Sala de estudio',
            serverId: newServer._id,
            section: 'canales de voz',
            messages: [],
            owner: [userId]
        });
        yield defaultChannelThree.save();
        const update = {
            $push: {
                channels: [defaultChannelOne._id, defaultChannelTwo._id, defaultChannelThree._id]
            }
        };
        yield user_1.default.findByIdAndUpdate(userId, {
            $push: { servers: [newServer._id] }
        });
        yield server_1.default.findByIdAndUpdate(newServer._id, update);
        res.sendStatus(201);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(406);
    }
});
exports.createServer = createServer;
const invitation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serverId, userId } = req.params;
        const isExistServer = yield server_1.default.findById(serverId);
        const isExistUser = yield user_1.default.findById(userId);
        if (isExistServer !== null && isExistUser !== null) {
            yield user_1.default.findByIdAndUpdate(userId, {
                $push: { servers: serverId }
            });
            yield server_1.default.findByIdAndUpdate(serverId, {
                $push: { users: userId }
            });
            console.log({ serverId, userId });
            res.sendStatus(202);
        }
        else {
            res.sendStatus(406);
        }
    }
    catch (error) {
        res.sendStatus(406);
    }
});
exports.invitation = invitation;
const deleteServer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { myId, serverId } = req.params;
        const findServer = yield server_1.default.findById(serverId);
        if ((findServer === null || findServer === void 0 ? void 0 : findServer.admin.toString()) === myId) {
            // Delete all channelId of messages
            yield message_1.default.deleteMany({ channelId: { $in: findServer === null || findServer === void 0 ? void 0 : findServer.channels } });
            // Delete all ids channel of server
            yield channel_1.default.deleteMany({ _id: { $in: findServer === null || findServer === void 0 ? void 0 : findServer.channels } });
            // remove all ids of users on arrays servers
            yield user_1.default.updateMany({}, { $pull: { servers: serverId } });
            // Delete server
            yield server_1.default.findByIdAndDelete(serverId);
            res.sendStatus(202);
        }
        else {
            res.sendStatus(406);
        }
    }
    catch (error) {
        res.sendStatus(406);
    }
});
exports.deleteServer = deleteServer;
