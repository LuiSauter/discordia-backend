"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const serverSchema = new mongoose_1.Schema({
    serverName: {
        required: true,
        type: String,
        trim: true
    },
    users: [
        {
            required: true,
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    admin: {
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    channels: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Channel'
        }
    ],
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Server', serverSchema);
