"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config/config"));
require("./database");
const PORT = process.env.NODE_ENV === 'development' ? 3000 : config_1.default.PORT;
app_1.default.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
