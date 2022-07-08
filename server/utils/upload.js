// image is coming in binary format from front-end
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

import dotenv from "dotenv";
dotenv.config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
  //takes 3 args
  url: `mongodb+srv://${username}:${password}@blog-web.loigo.mongodb.net/?retryWrites=true&w=majority`, //1st arg : db url
  options: { useNewUrlParser: true }, //2nd arg : options
  file: (req, file) => {
    //3rd arg : file(function) => takes arg as req and file
    const match = ["image/png", "image/jpg", "image/jpeg"];

    if (match.indexOf(file.mimeType) === -1) {
      //return the index number if exits in match array else returns -1
      return `${Date.now()}-blog-${file.originalname}`; //appending date to ensure unique names
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

export default multer({ storage });
