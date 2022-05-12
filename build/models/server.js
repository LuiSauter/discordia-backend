"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const serverSchema = new mongoose_1.Schema({
    serverName: {
        required: true,
        type: String,
        trim: true
    },
    users: [{
            required: true,
            type: mongoose_1.Schema.Types.ObjectId,
        }],
    rols: {
        required: true,
        type: [String]
    },
    channels: [{
            required: true,
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Channel'
        }]
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Server', serverSchema);
