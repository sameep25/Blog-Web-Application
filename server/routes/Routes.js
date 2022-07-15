import express from "express";

import { signupUser ,loginUser } from "../controller/user-controller.js";
import { uploadImage ,getImage } from "../controller/image-controller.js";
import { createPost ,getAllPosts ,getPostById ,updatePostById ,deletePostById} from "../controller/post-controller.js";
import { addNewComment ,getCommentsById ,deleteCommentById } from "../controller/comment-controller.js";

import upload from "../utils/upload.js"

const router = express.Router();

// signup a new user
router.post("/signup", signupUser);
router.post("/login", loginUser);

router.post("/file/upload" , upload.single('file') ,uploadImage) ; //using middleware to upload singel image-file
router.get("/file/:filename" ,getImage) ;

router.post("/create" ,createPost) ;
router.get("/posts" ,getAllPosts) ;
router.get("/post" ,getPostById) ;
router.put("/update/:id",updatePostById) ;
router.delete("/delete/:id" ,deletePostById) ;

router.post("/comment/new" ,addNewComment) ;
router.get("/comments/:id" ,getCommentsById) ;
router.delete("/comment/delete/:id" ,deleteCommentById) ;

export default router;
