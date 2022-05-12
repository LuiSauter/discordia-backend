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
exports.deleteChannel = exports.getChannel = exports.getAllChannel = void 0;
const channel_1 = __importDefault(require("../models/channel"));
const message_1 = __importDefault(require("../models/message"));
const user_1 = __importDefault(require("../models/user"));
const getAllChannel = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allChannels = yield channel_1.default.find({});
    res.status(200).json(allChannels);
});
exports.getAllChannel = getAllChannel;
const getChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const channel = yield channel_1.default.findById(req.params.id).populate('messages owner');
    res.status(200).json(channel);
});
exports.getChannel = getChannel;
const deleteChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, channelId } = req.params;
    const user = yield user_1.default.findById(userId);
    const channel = yield channel_1.default.findById(channelId);
    if (user === null || channel === null)
        res.sendStatus(406);
    try {
        const filterChannels = user === null || user === void 0 ? void 0 : user.channels.filter((channel) => channel.toString() !== channelId);
        const newOwner = channel === null || channel === void 0 ? void 0 : channel.owner.filter((ch) => ch.toString() !== userId);
        // delete userId of channel.owner
        yield channel_1.default.findByIdAndUpdate(channelId, { owner: newOwner }, { new: true });
        // delete channelId of user.channels
        yield user_1.default.findByIdAndUpdate(userId, { channels: filterChannels }, { new: true });
        if ((channel === null || channel === void 0 ? void 0 : channel.owner.length) === 1) {
            yield message_1.default.deleteMany({ channelId: channelId });
            yield channel_1.default.findByIdAndDelete(channelId);
        }
        res.sendStatus(202);
    }
    catch (error) {
        res.sendStatus(406);
    }
});
exports.deleteChannel = deleteChannel;
