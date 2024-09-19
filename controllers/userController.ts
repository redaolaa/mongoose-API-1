import Users from "../models/users";
import { Request, Response } from "express";
import { validatePassword, checkPasswords } from "../models/users";
import formatValidationError from "../errors/validation";
// ! import the jwt creation and verification utilities
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    if (checkPasswords(req.body.password, req.body.passwordConfirmation)) {
      const user = await Users.create(req.body);
      res.send(user);
    } else {
      res.status(400).send({
        message: "Passwords do not match",
        errors: { password: "Does not match password" },
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({
      message: "There was an error",
      errors: formatValidationError(e),
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const incomingPassword = req.body.password;
    const incomingEmail = req.body.email;
    // check if email belongs to an existing user in our database
    const foundUser = await Users.findOne({ email: incomingEmail });

    if (!foundUser) {
      return res.status(401).json({ message: "login failed. User not found" });
    }

    // check if the password is correct.
    const isValidPw: boolean = validatePassword(
      incomingPassword,
      foundUser.password
    );

    if (isValidPw) {
      // ! Issues a unique jwt for this user
      const token = jwt.sign(
        { userId: foundUser._id, email: foundUser.email }, // base64-compressed payload: anything you want
        process.env.SECRET || "developmentSecret", // a secret only known to srv
        { expiresIn: "24h" } // an expiry of the token
      );

      res.send({ message: "Login successful", token });
    } else {
      res
        .status(401)
        .send({ message: "Login failed. Check credentials and try again!" });
    }
  } catch (e) {
    res
      .status(401)
      .send({ message: "Login failed. Check credentials and try again!" });
  }
};

export async function getCurrentUser(req: Request, res: Response) {
  console.log("res: ", req.currentUser);
  try {
    res.status(200).send(req.currentUser);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "There was an error, please try again later." });
  }
}