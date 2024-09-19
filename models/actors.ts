// * This file is responsible for defining your own model (type) for your data (movie)

import mongoose from 'mongoose'

const actorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // movies: this should be an array of movie IDs
  image: { type: String, required: true },
  // ! Adding something called a "referencing relationship"
  // ! Essentially, this user must be a reference to a real user
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
})

export default mongoose.model('Actor', actorSchema)