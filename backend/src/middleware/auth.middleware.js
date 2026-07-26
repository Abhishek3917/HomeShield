    import jwt from 'jsonwebtoken'
    import User from '../model/auth.model.js'

    //1. check for token if there is any
    // 2. then verify that token by comparing that token with our secrets for validation
    // 3. then extract the userid from that and find it in db and store it in ser variable
    // 4. store it in req.user to get access to all where its called

    export const protectRoute = async(req,res,next) =>{

    try {
            const token = req.cookies.jwt

        if(!token){
            return res.status(401).json({message:"unautorized acesss"})
        }

        const payload = jwt.verify(token , process.env.JWT_TOKEN)
        // console.log(payload)

        if(!payload){
            return res.status(401).json({message:"unautorized acess"})
        }
        
        const user = await User.findById(payload.userId).select("-password")

        if(!user){
            return res.status(404).json({message:"no user found"})
        }

        req.user = user
        next()
    } catch (error) {
        if(error.name==="TokenExpiredError"){
            return res.status(401).json({
                message:"Token expired"
            })
        }

        if(error.name==="JsonWebTokenError"){
            return res.status(401).json({
                message:"Invalid token"
            })
        }

        return res.status(500).json({
            message:"Internal server error"
        })
    }
    }