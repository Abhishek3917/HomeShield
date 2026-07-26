
import express from "express"
import authRoutes from './routes/auth.routes.js'
import dashRoutes from './routes/dashboard.routes.js'
import { connectDB } from "./config/db.js"
import cookieParser from "cookie-parser"
import './config/env.js'
import { errorHandler } from "./middleware/Error.middleware.js"


const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoutes)

app.use("/api/dashboard",dashRoutes)



app.use(errorHandler)
const PORT = process.env.PORT


app.listen(PORT,()=>{
    console.log("server is running")
    connectDB()
}

)