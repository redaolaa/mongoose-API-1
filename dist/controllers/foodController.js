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
exports.getMovies = exports.getMovieById = exports.createMovie = exports.deleteMovie = exports.updateMovie = void 0;
const movies_1 = __importDefault(require("../models/movies"));
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // ! 1) Get the movieId
    const movieId = req.params.movieId;
    const update = req.body;
    // ! 2) Update the movie
    const updatedMovie = yield movies_1.default.findByIdAndUpdate(movieId, update, { new: true }); // ? The final argument returns the updated movie.
    // ! 3) Send back the movie you've updated
    res.send(updatedMovie);
});
exports.updateMovie = updateMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // ! req.currentUser tells us who is making the current request (eg., milo)
    console.log("delete request from user", req.currentUser);
    const movieId = req.params.movieId;
    // ! We're obtaining the movie document in order to check who is the owner
    const movieDoc = yield movies_1.default.findById(movieId);
    if (!movieDoc)
        return res.json({ message: "The Movie you're trying to delete is not found" });
    const movieOwnerID = movieDoc.user;
    console.log("the movie you're trying to delete is owned by", movieOwnerID);
    if (req.currentUser._id.equals(movieOwnerID)) { // if requester (eg., milo) === owner (eg., milo)
        // ! 2) Delete the movie 
        const deletedMovie = yield movies_1.default.findByIdAndDelete(movieId);
        // const deletedMovie = await Movies.findOneAndDelete({ _id: movieId }) // ? Alternative method.
        // ! 3) Send back deleted movie
        res.send(deletedMovie);
    }
    else {
        res.json({ message: "Sorry, it is not very nice to delete other people's movies." });
    }
});
exports.deleteMovie = deleteMovie;
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("this CREATE REQUEST is coming from this person: ", req.currentUser);
    // ! in order to create a movie, the schema requires a "user" field
    // ! and thus we must pull that out of the req.currentUser variable (which
    // !    is populated by the jwt validation code)
    req.body.user = req.currentUser._id;
    const movie = yield movies_1.default.create(req.body);
    res.send(movie);
});
exports.createMovie = createMovie;
const getMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // * The try part contains the code that can throw an error.
    try {
        // ! 1) Get the id I need to GET my movie
        const movieId = req.params.movieId;
        // ! 2) Find my movie
        const foundMovie = yield movies_1.default.findById(movieId);
        console.log(foundMovie);
        // const foundMovie = await Movies.findOne({ _id: movieId }) // ? Alternative method.
        // ! 3) Send back the movie you found!
        res.send(foundMovie);
        // * The catch part "catches" the error that was "thrown". We can handle it in here.
    }
    catch (e) {
        console.log(e);
        res.send({ message: "Movie not found. Did you provide a valid movieId?" });
    }
});
exports.getMovieById = getMovieById;
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield movies_1.default.find();
    res.send(movies);
});
exports.getMovies = getMovies;
