"use strict";
// TODO: make API server here
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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const foodController_1 = require("./dist/models/controllers/foodController");
const userController_1 = require("./dist/models/controllers/userController");
const app = (0, express_1.default)();
const router = express_1.default.Router();
router.route('/api/foods').get(foodController_1.getFoods);
router.route('/api/foods/:foodId').get(foodController_1.getFoodById);
router.route('/api/foods').post(foodController_1.createFood);
router.route('api/foods/:foodId').delete(foodController_1.deleteFood);
router.route('/api/foods/:foodId').put(foodController_1.updateFood);
router.route('/api/users').post(userController_1.createUser);
router.route('api/login').post(userController_1.login);
app.use(express_1.default.json());
app.use(router);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect("mongodb://127.0.0.1:27017/foodsdb");
        console.log("connected to the database!");
        app.listen(8002, () => {
            console.log(" Express API is running on http://locahost:8002");
        });
    });
}
start();
