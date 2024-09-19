"use strict";
// * This file is responsible for defining your own model (type) for your data (movie)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const movieSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    image: { type: String, required: true },
    // ! Adding something called a "referencing relationship"
    // ! Essentially, this user must be a reference to a real user
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true }
});
exports.default = mongoose_1.default.model('Movie', movieSchema);
