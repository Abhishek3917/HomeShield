import express from 'express'

const router = express.Router()

export const dashboard = async (req,res) =>{
    res.status(200).json({message:"dashboard"})
} 