// TODO: make API server here

import express from "express";
import mongoose from "mongoose";
import {Request, Response} from 'express'
import {getFoods, getFoodById, createFood, deleteFood, updateFood, } from './controllers/foodController'
import {createUser, login} from './controllers/userController'
const app = express();


const router = express.Router();

router.route('/api/foods').get(getFoods)
router.route('/api/foods/:foodId').get(getFoodById)
router.route('/api/foods').post(createFood)
router.route('api/foods/:foodId').delete(deleteFood)
router.route('/api/foods/:foodId').put(updateFood)

router.route('/api/users').post(createUser)
router.route ('api/login').post(login)




app.use(express.json());

app.use(router);

async function start() {
  await mongoose.connect("mongodb://127.0.0.1:27017/foodsdb");
  console.log("connected to the database!");



  app.listen(8002, () => {
    console.log(" Express API is running on http://locahost:8002");
  });
}
start();