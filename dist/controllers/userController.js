"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.login = exports.createUser = void 0;
const users_1 = __importStar(require("../models/users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("user has sent username", req.body);
        const incomingUser = req.body;
        let savedUser = yield users_1.default.create(incomingUser);
        console.log("just added username", savedUser);
        res.send(savedUser);
    }
    catch (e) {
        console.log(e);
        res.send({ message: "sign up failed " });
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const incomingData = req.body;
    const incomingUsername = req.body.username;
    const incomingPassword = req.body.password;
    //Check if user exists in the database. check if username belongs to exisitng user
    const foundUser = yield users_1.default.findOne({ username: incomingUsername });
    if (!foundUser) {
        return res.send({ message: "login fauled. user not found" });
    }
    // check if password is correct
    // hash the incoming password and match it to the actual password in users.ts
    const isValidPw = (0, users_1.validatePassword)(incomingPassword, foundUser.password);
    if (isValidPw) {
        // issues a unique jwt for this user
        const token = jsonwebtoken_1.default.sign({ userID: foundUser._id, username: foundUser.username }, "this is a very secret string only we know", // a secret only srver knows 
        { expiresIn: '24h' } // an expiry of the token
        );
        res.send({ message: "login successful" });
    }
    else {
        res.status(401).send({ message: "Login failed. try again" });
    }
});
exports.login = login;
