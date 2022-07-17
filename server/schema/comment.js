import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    googleId:{
        type:String,
        required:true,
    },
    picture:{
        type:String,
        required:true,
    },
    postId:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    commentText:{
        type:String,
        required:true,
    },
})

const comment = mongoose.model("comment" ,commentSchema) ;

export default comment ;