import Movies from "../models/movies";
import { Request, Response } from "express";

export async function createReview(req: Request, res: Response) {
  try {
    const movie = await Movies.findById(req.params.movieId);

    if (!movie) {
      return res.status(404).send({ message: "movie not found" });
    }

    const newReview = { ...req.body, user: req.currentUser._id };

    movie.reviews.push(newReview);

    const updatedMovie = await movie.save();

    return res.status(201).json(updatedMovie);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function updateReview(req: Request, res: Response) {
  try {
    const movie = await Movies.findById(req.params.movieId);

    if (!movie) {
      return res.status(404).send({ message: "movie not found" });
    }

    const review = movie.reviews.id(req.params.reviewId);

    if (!review) {
      return res.status(404).send({ message: "review not found" });
    }

    if (!review.user.equals(req.currentUser._id)) {
      return res.status(401).send({
        message:
          "Unauthorized: you can not update another users review, you naughty little monkey",
      });
    }

    review.set(req.body);

    const updatedMovie = await movie.save();

    return res.status(200).json(updatedMovie);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function deleteReview(req: Request, res: Response) {
  try {
    const movie = await Movies.findById(req.params.movieId);

    if (!movie) {
      return res.status(400).send({ message: "movie not found" });
    }

    const review = movie.reviews.id(req.params.reviewId);

    if (!review) {
      return res.status(400).send({ message: "review not found" });
    }

    if (!review.user.equals(req.currentUser._id)) {
      return res.status(401).send({
        message:
          "Unauthorized: you can not update another users review, you naughty little monkey",
      });
    }

    movie.reviews.pull({ _id: req.params.reviewId });
    const updatedMovie = await movie.save();

    return res.status(200).json(updatedMovie);
  } catch (error) {
    return res.status(400).send(error);
  }
}