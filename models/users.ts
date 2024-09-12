import mongoose from "mongoose"
import bcrypt from 'bcrypt'



const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true },
})

//Mongoose lets us run some custom code "pre" saving to DB
//? first argument= "save" or "validate" or other mongoose lifecycle
//? second argument= a function with a required argument of next
//? that you must call at the end
userSchema.pre('save', function hashPassword(next) { 
    console.log("users password", this.password)

    //! hashSync is a bcypt function
    //? first argumeny is our password we want to hash
    //? second argument lets you provide salt
this.password= bcrypt.hashSync(this.password, bcrypt.genSaltSync())
console.log("uses hashed pw", this.password)
    //! the this variable represents our about to be saved document in mongoDB


    //! calling next() tells mongoose we're done our custom stuff
    next()

})

export function validatePassword(plainTextPassword: string,
    hashedPasswordFromDB: string) {
        return bcrypt.compareSync(plainTextPassword, hashedPasswordFromDB)
    }


export default mongoose.model("User", userSchema)