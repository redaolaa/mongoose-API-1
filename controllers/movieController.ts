import Movies from "../models/movies";
import Actors from "../models/actors";
import { Request, Response } from "express";
import formatValidationError from "../errors/validation";

export const updateMovie = async (req: Request, res: Response) => {
  try {
    // ! 1) Get the movieId
    const movieId = req.params.movieId;
    const update = req.body;
    // ! 2) Update the movie
    const updatedMovie = await Movies.findByIdAndUpdate(movieId, update, {
      new: true,
    }); // ? The final argument returns the updated movie.
    // ! 3) Send back the movie you've updated
    res.send(updatedMovie);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    // ! req.currentUser tells us who is making the current request (eg., milo)
    console.log("delete request from user", req.currentUser);
    const movieId = req.params.movieId;

    // ! We're obtaining the movie document in order to check who is the owner
    const movieDoc = await Movies.findById(movieId);
    if (!movieDoc)
      return res.json({
        message: "The Movie you're trying to delete is not found",
      });

    const movieOwnerID = movieDoc.user;
    console.log("the movie you're trying to delete is owned by", movieOwnerID);

    if (req.currentUser._id.equals(movieOwnerID)) {
      // if requester (eg., milo) === owner (eg., milo)
      // ! 2) Delete the movie
      const deletedMovie = await Movies.findByIdAndDelete(movieId);
      // const deletedMovie = await Movies.findOneAndDelete({ _id: movieId }) // ? Alternative method.
      // ! 3) Send back deleted movie
      res.send(deletedMovie);
    } else {
      res.json({
        message: "Sorry, it is not very nice to delete other people's movies.",
      });
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const createMovie = async (req: Request, res: Response) => {
  console.log(
    "this CREATE REQUEST is coming from this person: ",
    req.currentUser
  );

  // ! in order to create a movie, the schema requires a "user" field
  // ! and thus we must pull that out of the req.currentUser variable (which
  // !    is populated by the jwt validation code)
  req.body.user = req.currentUser._id;
  try {
    const movie = await Movies.create(req.body);

    // we have the ids of the actors in the movie. We need to add the movie id to the actors
    // ['3454fefer3r', '3243ruroywedqs']

    await Actors.updateMany(
      { _id: movie.actors },
      { $push: { movies: movie._id } }
    );

    res.send(movie);
  } catch (error) {
    res.status(400).json({
      message: "could not create movie",
      errors: formatValidationError(error),
    });
  }
};

export const getMovieById = async (req: Request, res: Response) => {
  // * The try part contains the code that can throw an error.
  try {
    // ! 1) Get the id I need to GET my movie
    const movieId = req.params.movieId;
    // ! 2) Find my movie
    // const foundMovie = await Movies.findById(movieId) // ? The populate method is used to get the actors' data.
    const foundMovie = await Movies.findById(movieId).populate("actors");

    console.log(foundMovie);
    // const foundMovie = await Movies.findOne({ _id: movieId }) // ? Alternative method.
    // ! 3) Send back the movie you found!
    res.send(foundMovie);

    // * The catch part "catches" the error that was "thrown". We can handle it in here.
  } catch (e) {
    console.log(e);
    res.send({ message: "Movie not found. Did you provide a valid movieId?" });
  }
};

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movies.find();
    res.send(movies);
  } catch (error) {
    return res.status(400).send(error);
  }
};