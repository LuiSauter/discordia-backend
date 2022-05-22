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
exports.getAllUsers = exports.getUser = exports.login = void 0;
const user_1 = __importDefault(require("../models/user"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUser = yield user_1.default.findOne({ email: req.body.email });
    if (isUser === null) {
        try {
            const newUser = new user_1.default(req.body);
            yield newUser.save();
            res.status(201).json({ status: 'Successful registration' });
        }
        catch (error) {
            console.error(Error);
            res.sendStatus(406);
        }
    }
    else {
        res.status(202).json({ status: 'Login successfully' });
    }
});
exports.login = login;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({
            username: req.params.username
        }).populate('channels servers');
        res.status(200).json(user);
    }
    catch (error) {
        console.error(Error);
        res.sendStatus(406);
    }
});
exports.getUser = getUser;
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find({}).select('username photoUrl createdAt channels');
    return res.status(200).json(users);
});
exports.getAllUsers = getAllUsers;
