import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  categories: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
  },
});

const post = mongoose.model("post" ,postSchema) ;

export default post ;
