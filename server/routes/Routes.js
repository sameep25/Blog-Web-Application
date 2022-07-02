import express from "express";

import { signupUser } from "../controller/user-controller.js";

const router = express.Router();

// signup a new user
router.post("/signup", signupUser);

export default router;
