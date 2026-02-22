import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    author:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"User" ,
           required : true          
    },
    mediaType:{
        type:String,
        enum:["image","video"],
        required:true
    },
    media:{
        type:String,
        required:true
    },
    viewers:[
        {
           type:mongoose.Schema.Types.ObjectId,
           ref:"User" ,
           required : true          
        }
    ],
    createdAt:{
        type:Date,
        required:Date.now(),
        expires: 86400    //24*60*60*1000
    }
       
},{timestamps:true})

const Story = mongoose.model("Story",storySchema)
export default Story