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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./config/router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', router_1.default); // replacing the /api in the routes so instead of '/api/movies' we can have just '/movies'
const dbURI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/moviesdb';
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        // ! Before we start express, we connect to the database.
        yield mongoose_1.default.connect(dbURI);
        console.log("Connected to the database! 🔥");
        app.listen(process.env.PORT, () => {
            console.log(`Express API is running on http://localhost:${process.env.PORT}`);
        });
    });
}
start();
