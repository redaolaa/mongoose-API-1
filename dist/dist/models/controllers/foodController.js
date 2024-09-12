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
exports.updateFood = exports.deleteFood = exports.createFood = exports.getFoodById = exports.getFoods = void 0;
const foods_1 = __importDefault(require("../foods"));
const getFoods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let obtainedFoods = yield foods_1.default.find();
    console.log("obtained these from db", obtainedFoods);
    res.send(obtainedFoods);
});
exports.getFoods = getFoods;
const getFoodById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foodId = req.params.foodId;
        console.log(foodId);
        const obtainedFood = yield foods_1.default.findById(foodId);
        console.log("food obtained", obtainedFood);
        res.send(obtainedFood);
    }
    catch (e) {
        console.log(e);
        res.send({ message: "Food not found: Did you provide valid foodId" });
    }
});
exports.getFoodById = getFoodById;
const createFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("user has sent", req.body);
        const incomingFood = req.body;
        let savedFood = yield foods_1.default.create(incomingFood);
        console.log("just added", savedFood);
        res.send(savedFood);
    }
    catch (e) {
        console.log(e);
        res.send({ message: " no input found, did you provide valid " });
    }
});
exports.createFood = createFood;
const deleteFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foodId = req.params.foodId;
        const deletedFood = yield foods_1.default.findByIdAndDelete(foodId);
        console.log("food deleted", deletedFood);
        res.send({ message: "Food item deleted", deletedFood });
    }
    catch (e) {
        console.log(e);
        res.send({ message: "unable to delete" });
    }
});
exports.deleteFood = deleteFood;
const updateFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // ! 1) Get the movieId
    const foodId = req.params.foodId;
    const update = req.body;
    // ! 2) Update the movie
    const updatedFood = yield foods_1.default.findByIdAndUpdate(foodId, update, { new: true }); // ? The final argument returns the updated movie.
    // ! 3) Send back the movie you've updated
    res.send(updatedFood);
});
exports.updateFood = updateFood;
