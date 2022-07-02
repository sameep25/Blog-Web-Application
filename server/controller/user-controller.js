import bcrypt from "bcrypt";

import User from "../schema/user.js";

export const signupUser = async (req, res) => {
  try {
    // const salt = await bcrypt.genSalt() ;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    };
    const newUser = new User(user);
    await newUser.save();
    return res.status(200).json({ msg: "signup successfull" });
  } catch (error) {
    return res.status(400).json({ msg: "error while signup the user" });
  }
};
