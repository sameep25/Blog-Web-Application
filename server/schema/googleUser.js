import mongoose from "mongoose";

const googleUserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  },
  googleId: {
    type: String,
    required: true,
  },
});

const GoogleUser = mongoose.model("googleUser",googleUserSchema) ;
export default GoogleUser ;
