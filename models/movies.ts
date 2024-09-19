// * This file is responsible for defining your own model (type) for your data (movie)

import mongoose from 'mongoose'


const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true },
  stars: { type: Number, required: true, min: 1, max: 5 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {timestamps: true})

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  image: { type: String, required: true },
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }],
  // ! Adding something called a "referencing relationship"
  // ! Essentially, this user must be a reference to a real user
 // actors: this should be an array of actor IDs
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
  reviews: [reviewSchema]
})

export default mongoose.model('Movie', movieSchema)