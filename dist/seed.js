import mongoose from "mongoose"
import Users from "./dist/models/users"

async function seed() {
await mongoose.connect("mongodb://127.0.0.1:27017/users")
console.log("connected to the database")

const newUser = await Users.create()



}

seed()