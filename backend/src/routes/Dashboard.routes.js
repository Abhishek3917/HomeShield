import express from 'express'
import { dashboard,dashActivity,dashHealth } from '../controller/dashboard.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get("/",protectRoute,dashboard)
router.get("/activity",protectRoute,dashActivity)
router.get("/health",protectRoute,dashHealth)

export default router