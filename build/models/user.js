"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        required: true,
        type: String,
        trim: true,
        unique: true
    },
    email: {
        required: true,
        type: String,
        trim: true,
        unique: true
    },
    photoUrl: {
        required: true,
        type: String
    },
    about: String,
    channels: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Channel'
        }],
    servers: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Server'
        }]
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', userSchema);
