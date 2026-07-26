import User from '../model/auth.model.js'
import { generateToken } from '../lib/utility.js'
import { loginService, signupService, terminateService } from '../services/auth.services.js'
import AppError from '../lib/AppError.js';

// signup 
export const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const user = await signupService({
            email,
            password,
        });
        generateToken(user._id, res);

        return res.status(201).json({
            _id: user._id,
            email: user.email,
        });

    } catch (error) {
        next(error);
    }
};

// login
export const login = async(req,res,next)=>{
    try {
        const {email,password} = req.body

        const user = await loginService({email,password})

        generateToken(user._id,res)
        res.status(200).json({
            _id:user._id,
            email:user.email,
        })

    } catch (error) {
        next(error)
        
    }
}
// logout
export const logout = async(req,res,next)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"logged out succesfully"})
    } catch (error) {
        next(error)
    }
}
// check
export const sessionAuth = async(req,res,next) =>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        next(error)
    }
}

// delete
export const terminate = async(req,res,next) =>{
    try {
        const result = await terminateService({user:req.user})

        if(result.deletedCount === 0 ){
            throw AppError.badRequest("user not found")
        }
        else{
            return res.status(200).json({message: "Account deleted successfully"});
        }
    } catch (error) {
        next(error)
    }
}

