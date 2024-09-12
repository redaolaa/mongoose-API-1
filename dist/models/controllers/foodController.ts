
import Foods from '../foods'
import {Request,Response} from 'express'


export const getFoods = async (req: Request, res: Response) => {
  
    let obtainedFoods = await Foods.find();
    console.log("obtained these from db", obtainedFoods);
    res.send(obtainedFoods);
}

export const getFoodById = async (req: Request, res: Response) => {
    try {
    const foodId = req.params.foodId;
    console.log(foodId);
  
    const obtainedFood = await Foods.findById(foodId);
    console.log("food obtained", obtainedFood);
  
    res.send(obtainedFood);
    } catch (e) {
      console.log(e)
      res.send({message: "Food not found: Did you provide valid foodId"})
    }
  };

  export const createFood = async (req: Request, res: Response) => {
    try {
    console.log("user has sent", req.body);
    const incomingFood = req.body;
  
    let savedFood = await Foods.create(incomingFood);
    console.log("just added", savedFood);
    res.send(savedFood);
    } catch (e) {
      console.log(e)
      res.send({ message:" no input found, did you provide valid "})
    }
};
  

export const deleteFood= async (req: Request, res: Response) => {
  try{
  const foodId = req.params.foodId;
const deletedFood = await Foods.findByIdAndDelete(foodId)
console.log("food deleted", deletedFood)
res.send({message: "Food item deleted", deletedFood})
} catch(e) {
  console.log(e) 
    res.send({message: "unable to delete"})
}
}


export const updateFood= async (req : Request, res: Response) => {
    // ! 1) Get the movieId
    const foodId = req.params.foodId
    const update = req.body
    // ! 2) Update the movie
    const updatedFood = await Foods.findByIdAndUpdate(foodId, update, { new: true }) // ? The final argument returns the updated movie.
    // ! 3) Send back the movie you've updated
    res.send(updatedFood)
}

