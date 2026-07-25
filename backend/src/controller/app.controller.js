import User from '../model/auth.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../lib/utility.js'

export const signup = async (req,res)=>{
    try {
        if(!email || !password){
            return res.status(400).json({message:"all feilds are required"}) 
        }

        if(password.length<6){
            return res.status(400).json({message:"password have min 6 length "}) 
        }

        const user = await User.findOne({email})

        if (!user){
            return res.status(400).json({message:"email is already registered"})
        }

        const salt = await bcrypt.gensalt(10)
        const hashpassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            email,
            password:hashpassword
        })

        if(newUser){
            // gen token
            await newUser.save()
            generateToken(newUser._id,res)
            return  res.status(200).json({
                    _id:newUser._id,
                    email:newUser.email,            
                })
            
        }
        else{
            res.status(400).json({message:"invalid user data"})
        }


    } catch (error) {
        res.status(404).json({message:"invalid path"})
    }
}