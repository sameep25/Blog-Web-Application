import express from "express";

import { signupUser ,loginUser } from "../controller/user-controller.js";
import { uploadImage ,getImage } from "../controller/image-controller.js";

import upload from "../utils/upload.js"

const router = express.Router();

// signup a new user
router.post("/signup", signupUser);
router.post("/login", loginUser);

router.post("/file/upload" , upload.single('file') ,uploadImage) ; //using middleware to upload singel image-file
router.get("/file/:filename" ,getImage) ;

export default router;
