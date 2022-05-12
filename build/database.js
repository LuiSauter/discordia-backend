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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const connectionString = config_1.default.MONGO_URI;
if (connectionString === '') {
    throw new Error('Please define the MONGO_URI environment variable inside in .env');
}
function connectDb() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(connectionString);
    });
}
exports.default = connectDb;
mongoose_1.default.connection.once('open', () => {
    console.log('Database mongoDB connection stablished');
});
mongoose_1.default.connection.on('error', (error) => {
    console.error(error);
    process.exit(0);
});
connectDb().catch(console.error);
