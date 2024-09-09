"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// ! We create an instance of an express app/server by calling the express function.
const app = (0, express_1.default)();
// ! It needs to be able to handle different ROUTES.
// ? setup router
const router = express_1.default.Router();
// ? use the router method, with a get method
router.route('/api/hello').get((req, res) => {
    res.send('Hello back');
});
// ? use the router in our express app
app.use(router);
// ! Program needs to be running all the time -- otherwise you get downtime. It has to be available.
// ? first argument is a PORT number, second is a function
app.listen(8000, () => {
    console.log('Express API is running on http://localhost:8000');
});
