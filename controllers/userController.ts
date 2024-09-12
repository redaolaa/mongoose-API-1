
import Users, { validatePassword } from '../models/users'
import {Request,Response} from 'express'
import jwt from 'jsonwebtoken'

export const createUser = async (req: Request, res: Response) => {
    try {
    console.log("user has sent username", req.body);
    const incomingUser = req.body;
  
    let savedUser = await Users.create(incomingUser);
    console.log("just added username", savedUser)
    ;
    res.send(savedUser);
    } catch (e) {
      console.log(e)
      res.send({ message:"sign up failed "})
    }
};
  
export const login= async(req: Request,res: Response)=> {
const incomingData= req.body
const incomingUsername= req.body.username
const incomingPassword = req.body.password
//Check if user exists in the database. check if username belongs to exisitng user
const foundUser= await Users.findOne({ username: incomingUsername})
if (!foundUser) {
    return res.send({message: "login fauled. user not found"})
}

// check if password is correct

// hash the incoming password and match it to the actual password in users.ts
 const isValidPw:boolean = validatePassword(incomingPassword, foundUser.password)
if (isValidPw){

// issues a unique jwt for this user
    const token = jwt.sign(
        {userID: foundUser._id, username: foundUser.username}, 
        "this is a very secret string only we know", // a secret only srver knows 
        {expiresIn: '24h'} // an expiry of the token
    )
    res.send({message: "login successful"})
} else {
    res.status(401).send({message: "Login failed. try again"})

}
}