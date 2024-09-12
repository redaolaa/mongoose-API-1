"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bycrypt_1 = __importDefault(require("bycrypt"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
//Mongoose lets us run some custom code "pre" saving to DB
//? first argument= "save" or "validate" or other mongoose lifecycle
//? second argument= a function with a required argument of next
//? that you must call at the end
userSchema.pre('save', function hashPassword(next) {
    console.log("users password", this.password);
    //! hashSync is a bcypt function
    //? first argumeny is our password we want to hash
    //? second argument lets you provide salt
    this.password = bycrypt_1.default.hashSync(this.password, bycrypt_1.default.genSaltSync());
    console.log("uses hashed pw", this.password);
    //! the this variable represents our about to be saved document in mongoDB
    //! calling next() tells mongoose we're done our custom stuff
    next();
});
function validatePassword(plainTextPassword, hashedPasswordFromDB) {
    return bycrypt_1.default.compareSync(plainTextPassword, hashedPasswordFromDB);
}
exports.validatePassword = validatePassword;
exports.default = mongoose_1.default.model("User", userSchema);
