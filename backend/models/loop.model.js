import mongoose from "mongoose";
//for reels
const loopSchema = new mongoose.Schema({
     author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User" ,
            required : true          
        },
        media:{
            type:String,
            required:true
        },
        caption:{
            type:String
        },
        likes:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
         comments:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
})

const Loop = mongoose.model("Loop",loopSchema)
export default Loop