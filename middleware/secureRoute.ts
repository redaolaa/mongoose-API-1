import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import Users from '../models/users'

export default function secureRoute(req: Request, res: Response, next: NextFunction) {
    // ! Check if there's a token? If there's no authorization token, reject 
    const rawToken = req.headers.authorization
    if (!rawToken) {
        return res.status(401).json({ message: "Unauthorized. No Auth header found" })
    }
    // ! Use the string.replace method to go from "Bearer thisismyjwt" to "thisismyjwt"
    const token = rawToken.replace("Bearer ", "")

    // ! Let's verify if this is a legit jwt(keyfob) and which user it is (via jwt payload)
    // ? jwt.verify first argument is the jwt token
    // ? the secret with which we had issued the jwt (in jwt.sign method)
    // ? callback function which lets us check for errors + move on if necessary
    //      - in the callback we must specify two variables
    //      - the first argument will be filled in with any erors (if any)
    //      - the second argument will be filled in with the payload
    jwt.verify(token, (process.env.SECRET || "developmentSecret"), async (err, payload) => {
        if (err || !payload) {
            return res.status(401).json({ message: "Unauthorized. Invalid JWT." })
        }
        console.log("Valid token! The payload is:",payload)

        interface JWTPayload {
            userId: string
        }

        const jwtPayload = payload as JWTPayload
        const userId = jwtPayload.userId

        const user = await Users.findById(userId)
        if (!user) {
            return res.status(401).json({ message: "User not found. Invalid JWT!" })
        }

        // ! We shall attach the user info (from the paylod) to the "req" request object, so that
        // ! our delete route handler (and other privileged route handlers can) can make use of it
        req.currentUser = user;

        next() // the request moves on to the next middleware in the chain
    })
}