import mongoose from "mongoose";

export const Connection = async (username ,password) =>{
    const URL = `mongodb+srv://${username}:${password}@blog-web.loigo.mongodb.net/?retryWrites=true&w=majority` ;
    try{
        await mongoose.connect(URL ,{ useNewUrlParser : true });
        console.log("database connected successfully");
    }catch(error){
        console.log("Error while connecting with database",error);
    }
}

export default Connection ;