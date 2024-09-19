"use strict";
// * This file is responsible for defining your own model (type) for your data (movie)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPasswords = exports.validatePassword = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const mongoose_hidden_1 = __importDefault(require("mongoose-hidden"));
// Stretch: use mongoose-unique-validator to ensure uniqueness across dropped collections
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: (email) => validator_1.default.isEmail(email),
    },
    password: {
        type: String,
        required: true,
        validate: (password) => validator_1.default.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 1,
            minNumbers: 1,
        }),
    },
});
// ! Mongoose lets us run some custom code "pre"-saving to DB
// ? first argument = "save" or "validate" or other mongoose lifecycle (typically save)
// ? second argument = a function with a required argument of next
//                    that you must call at the end.
userSchema.pre("save", function hashPassword(next) {
    // ! "this" variable represents our about-to-be-saved document
    //   in mongoDB
    console.log("user's password", this.password);
    // ! hashSync is a bcrypt function
    // ? first argument is our password we want to hash
    // ? second argument lets you provide a salt
    this.password = bcrypt_1.default.hashSync(this.password, bcrypt_1.default.genSaltSync());
    console.log("user's hashed password", this.password);
    // ! calling next() tells mongoose we're done our custom stuff
    next();
});
function validatePassword(plainTextPassword, hashedPasswordFromDB) {
    return bcrypt_1.default.compareSync(plainTextPassword, hashedPasswordFromDB);
}
exports.validatePassword = validatePassword;
function checkPasswords(password, passwordConfirmation) {
    return password === passwordConfirmation;
}
exports.checkPasswords = checkPasswords;
userSchema.plugin((0, mongoose_hidden_1.default)({ defaultHidden: { password: true } }));
exports.default = mongoose_1.default.model("User", userSchema);
