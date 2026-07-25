import User from '../model/auth.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../lib/utility.js'

// signup 
export const signup = async (req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({message:"all feilds are required"}) 
        }

        if(password.length<6){
            return res.status(400).json({message:"password have min 6 length "}) 
        }

        const user = await User.findOne({email})

        if (user){
            return res.status(400).json({message:"email is already registered"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            email,
            password:hashpassword
        })

        if(newUser){
            // gen token
            await newUser.save()
            generateToken(newUser._id,res)
            return res.status(200).json({
                        _id:newUser._id,
                        email:newUser.email,            
                    })
            
        }
        else{
            res.status(400).json({message:"invalid user data"})
        }

    } catch (error) {
        console.log("Error in signupcontroller",error.message)
        res.status(500).json({message:"Internal server Error"})
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message:"invalid credentials"})
        }
        const passwordverify = await bcrypt.compare(password,user.password)

        if(!passwordverify){
            return res.status(400).json({message:"invalid credentials"})
        }

        generateToken(user._id,res)
        res.status(200).json({
            _id:user._id,
            email:user.email,
        })

    } catch (error) {
        console.log("Error in logincontroller",error.message)
        return res.status(500).json({message:"internal server error"})
        
    }
}

export const logout = async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"logged out succesfully"})
    } catch (error) {
        console.log("Error in logoutcontroller",error.message)
        res.status(500).json({message:"Internal server Error"})   
    }
}