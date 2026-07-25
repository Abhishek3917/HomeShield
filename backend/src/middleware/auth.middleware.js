import jwt from 'jsonwebtoken'
import User from '../model/auth.model'

//1. check for token if there is any
// 2. then verify that token by comparing that token with our secrets for validation
// 3. then extract the userid from that and find it in db and store it in ser variable
// 4. store it in req.user to get access to all where its called

export const protectRoute = async(req,res) =>{

    const token = req.cookie.jwt

    if(!token){
        return res.status()
    }
}