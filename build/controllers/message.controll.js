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
exports.deleteMessage = exports.createMessage = exports.getAllMessages = exports.test = void 0;
const message_1 = __importDefault(require("../models/message"));
const channel_1 = __importDefault(require("../models/channel"));
const user_1 = __importDefault(require("../models/user"));
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { myId, yourId } = req.body;
    try {
        const result = yield channel_1.default.findOne({ owner: [myId, yourId] });
        console.log(result);
        res.status(200).json(result);
    }
    catch (error) {
        res.sendStatus(406);
    }
});
exports.test = test;
const getAllMessages = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allMessages = yield message_1.default.find({});
    res.status(200).json(allMessages);
});
exports.getAllMessages = getAllMessages;
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, myId, yourId, channelId, serverId } = req.body;
    if (channelId === undefined && serverId === undefined) {
        try {
            const isExist = yield channel_1.default.findOne({ owner: [myId, yourId] });
            if (isExist === null) {
                // create channel
                const newChannel = yield channel_1.default.create({ owner: [myId, yourId] });
                yield newChannel.save();
                // create message
                const newMessage = new message_1.default({
                    message: message,
                    author: myId,
                    channelId: newChannel._id,
                });
                yield newMessage.save();
                // add channelId in users
                yield user_1.default.findByIdAndUpdate(myId, {
                    $push: { channels: newChannel._id },
                });
                yield user_1.default.findByIdAndUpdate(yourId, {
                    $push: { channels: newChannel._id },
                });
                // add messages in new channel
                yield channel_1.default.findByIdAndUpdate(newChannel._id, { messages: [newMessage._id] }, { new: true });
                res.sendStatus(201);
            }
            else {
                res.sendStatus(406);
            }
        }
        catch (error) {
            console.error(error);
            res.sendStatus(406);
        }
    }
    else {
        try {
            const isExist = yield channel_1.default.findById(channelId);
            if (isExist !== null) {
                const newMessage = new message_1.default({
                    message,
                    author: myId,
                    channelId,
                });
                yield newMessage.save();
                const filter = { $push: { messages: newMessage._id } };
                yield channel_1.default.findByIdAndUpdate(channelId, filter);
                res.sendStatus(201);
            }
            else {
                res.sendStatus(406);
            }
        }
        catch (error) {
            res.sendStatus(406);
        }
    }
});
exports.createMessage = createMessage;
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { msgId, channelId } = req.params;
        const isExistMsg = yield message_1.default.findById(msgId);
        if (isExistMsg !== null) {
            try {
                const channel = yield channel_1.default.findById(channelId);
                const filter = channel === null || channel === void 0 ? void 0 : channel.messages.filter((msgId) => msgId.toString() !== msgId);
                yield channel_1.default.findByIdAndUpdate(channelId, { messages: filter }, { new: true });
                yield message_1.default.findByIdAndDelete(msgId);
                res.sendStatus(202);
            }
            catch (error) {
                console.log(error);
                res.sendStatus(406);
            }
        }
        else
            res.sendStatus(400);
    }
    catch (error) {
        res.sendStatus(406);
    }
});
exports.deleteMessage = deleteMessage;
