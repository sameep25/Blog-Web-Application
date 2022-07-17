import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../schema/user.js";
import Token from "../schema/token.js";
import GoogleUser from "../schema/googleUser.js";

dotenv.config();

// signup user
export const signupUser = async (req, res) => {
  try {
    // const salt = await bcrypt.genSalt() ;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    };
    const newUser = new User(user); //varifing schema of user
    await newUser.save();
    return res.status(200).json({ msg: "signup successfull" });
  } catch (error) {
    return res.status(400).json({ msg: "error while signup the user" });
  }
};

// login user
export const loginUser = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ msg: "user doesn't exist in database" });
    }

    let match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        //takes 2 args. 1.body 2.secret_key to combine them to form a accessToken
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" } //expiresIn arg to specify the duration of expiration of token
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = new Token({ token: refreshToken });
      await newToken.save();

      return res.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        username: user.username,
      });
    } else {
      res.status(400).json({ msg: "password doesn't match" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "error while login the user " });
  }
};

export const googleLoginUser = async (req, res) => {
  try {
    let id = req.body.googleId;
    let googleUser = await GoogleUser.findOne({ googleId: id });

    if (googleUser) {
      return res.status(200).json(googleUser);
    }
    const newUser = new GoogleUser(req.body); //varifing schema of user
    await newUser.save();
    return res.status(200).json(googleUser);
  } 
  catch (error) {
    return res.status(400).json({ msg: "Error while login google user " + error });
  }
};
