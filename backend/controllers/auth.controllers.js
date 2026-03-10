import genToken from "../config/token"
import User from "../models/user.model"
import bcrypt from "bcryptjs"

export const signUp = async (res , req) =>{
    try {
        const {name ,email ,password , userName} = req.body

        const findByEmail = await User.findOne({email})
        if(findByEmail){
            return res.status(400).json(
                {message:"Email name already exist !"})
        }

        const findByUserName = await User.findOne({userName})
        if(findByUserName){
            return res.status(400).json(
                {message:"User name already exist !"})
        }

        if (password.length<6){
            return res.status(400).json(
                {message:"Password must be at least 6 characters"})
        }

        const hashedPassword = await bcrypt.hash(password , 10)

        const user = await User.create({
            name , 
            userName,
            email,
            password:hashedPassword
        })

        const token = await genToken(user._id)

        res.cookie("token", token , {
            httpOnly:true,
            maxAge:1*365*24*60*60*1000,
            secure:"false",
            sameSite:"Strict"
        })

        return ews.status(201).json(user)
        
    } catch (error) {
        return res.status(500).json({message:`signup error ${error}`})
    }
}

export const signIn = async (res , req) =>{
    try {
        const {password , userName} = req.body

        const user = await User.findOne({userName})
        if(!user){
            return res.status(400).json(
                {message:"User not found!"})
        }

        const isMatch = await bcrypt.compare(password , user.password)

        if (!isMatch){
            return res.status(400).json(
                {message:"Incorrect password!"})
        }

        const token = await genToken(user._id)

        res.cookie("token", token , {
            httpOnly:true,
            maxAge:1*365*24*60*60*1000,
            secure:"false",
            sameSite:"Strict"
        })

        return ews.status(201).json(user)
        
    } catch (error) {
        return res.status(500).json({
            message:`signin error ${error}`
        })
    }
}

export const signOut = async (req , res) =>{
    try {
        req.clearCookie("token")
        return res.status(200).json({
            message:"Sign out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message:`signOut error ${error}`
        })
    }
}