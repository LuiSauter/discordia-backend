"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    message: {
        required: true,
        type: String
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    channelId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Channel'
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Message', messageSchema);
