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
exports.getCurrentUser = exports.login = exports.signup = void 0;
const users_1 = __importDefault(require("../models/users"));
const users_2 = require("../models/users");
const validation_1 = __importDefault(require("../errors/validation"));
// ! import the jwt creation and verification utilities
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((0, users_2.checkPasswords)(req.body.password, req.body.passwordConfirmation)) {
            const user = yield users_1.default.create(req.body);
            res.send(user);
        }
        else {
            res.status(400).send({
                message: "Passwords do not match",
                errors: { password: "Does not match password" },
            });
        }
    }
    catch (e) {
        console.log(e);
        res.status(400).send({
            message: "There was an error",
            errors: (0, validation_1.default)(e),
        });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incomingPassword = req.body.password;
        const incomingEmail = req.body.email;
        // check if email belongs to an existing user in our database
        const foundUser = yield users_1.default.findOne({ email: incomingEmail });
        if (!foundUser) {
            return res.status(401).json({ message: "login failed. User not found" });
        }
        // check if the password is correct.
        const isValidPw = (0, users_2.validatePassword)(incomingPassword, foundUser.password);
        if (isValidPw) {
            // ! Issues a unique jwt for this user
            const token = jsonwebtoken_1.default.sign({ userId: foundUser._id, email: foundUser.email }, // base64-compressed payload: anything you want
            process.env.SECRET || "developmentSecret", // a secret only known to srv
            { expiresIn: "24h" } // an expiry of the token
            );
            res.send({ message: "Login successful", token });
        }
        else {
            res
                .status(401)
                .send({ message: "Login failed. Check credentials and try again!" });
        }
    }
    catch (e) {
        res
            .status(401)
            .send({ message: "Login failed. Check credentials and try again!" });
    }
});
exports.login = login;
function getCurrentUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("res: ", req.currentUser);
        try {
            res.status(200).send(req.currentUser);
        }
        catch (error) {
            console.log(error);
            res
                .status(500)
                .send({ message: "There was an error, please try again later." });
        }
    });
}
exports.getCurrentUser = getCurrentUser;
