import express from "express";
import {
  createMovie,
  deleteMovie,
  getMovies,
  getMovieById,
  updateMovie,
} from "../controllers/movieController";
import { signup, login, getCurrentUser } from "../controllers/userController";
import { createActor, getActors } from "../controllers/actorController";
import {
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewsController";
import secureRoute from "../middleware/secureRoute";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);

router.route("/movies").get(getMovies).post(secureRoute, createMovie);

// secure
router
  .route("/movies/:movieId")
  .get(getMovieById)
  .delete(secureRoute, deleteMovie)
  .put(secureRoute, updateMovie); // secure: only milo can delete milo's movies

router.route("/actors").get(getActors).post(secureRoute, createActor);

router.route("/movies/:movieId/reviews").post(secureRoute, createReview);

router
  .route("/movies/:movieId/reviews/:reviewId")
  .put(secureRoute, updateReview)
  .delete(secureRoute, deleteReview);

router.route("/user").get(secureRoute, getCurrentUser);

export default router;