"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const channelSchema = new mongoose_1.Schema({
    channelName: {
        type: String,
        trim: true
    },
    serverId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Server'
    },
    section: String,
    messages: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Message'
        }],
    owner: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Channel', channelSchema);
