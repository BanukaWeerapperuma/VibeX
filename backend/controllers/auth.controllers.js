import genToken from "../config/token"
import User from "../models/user.model"
import bcrypt from "bcryptjs"

export const signUp = async (res , req) =>{
    try {
        const {name ,email ,password , userName} = req.body

        const findByEmail = await User.findOne({email})
        if(findByUserName){
            return res.status(400).json(
                {message:"User name already exist !"})
        }

        const findByUserName = await User.findOne({email})
        if(findByUserName){
            return res.status(400).json(
                {message:"User name already exist !"})
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

        const findByUserName = await User.findOne({email})
        if(findByUserName){
            return res.status(400).json(
                {message:"User name already exist !"})
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