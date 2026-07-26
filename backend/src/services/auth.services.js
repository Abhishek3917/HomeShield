import AppError from "../lib/AppError.js";
import User from "../model/auth.model.js";
import bcrypt from "bcryptjs"

export const signupService = async ({email,password}) =>{

    if (!email || !password) {
        throw AppError.badRequest("All fields are required.");
        }

    if(password.length<6){
        throw AppError.badRequest( "password must have min 6 code.");
        }
    const user = await User.findOne({email})

    if (user) {
        throw AppError.conflict( "Email already registered.");
        }

    const hashpassword = await bcrypt.hash(password,10)
    const createdUser = await User.create({
        email,
        password:hashpassword
        })
    return createdUser
     
}

export const loginService = async ({email,password}) =>{
    
    const user = await User.findOne({email})
    if(!user){
        throw AppError.unauthorized("invalid credentials")
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        throw AppError.unauthorized("invalid credentials")
    }
    return user
}

export const terminateService = async ({user}) =>{
    const result = await User.findByIdAndDelete({_id:user._id})
    return result
}
