import express from 'express'
import { login, signup,logout,sessionAuth,terminate} from '../controller/auth.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.get("/session",protectRoute,sessionAuth)
router.delete("/account",protectRoute,terminate)

export default router