import dotenv from "dotenv";

import GoogleUser from "../schema/googleUser.js";

dotenv.config();

// login using google credentials
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
