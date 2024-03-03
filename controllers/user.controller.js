import dotenv from "dotenv";
dotenv.config();

import User from "../modals/user.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(500).json({ Error: "All fields are mandatory" });
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400).json({ Error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(200).json({ _id: user.id, email: user.email });
    } else {
      res.status(400).json({ Error: "Unable to create User" });
    }
    // res.status(200).json(User);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({ email });
    //compare password with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(401).json({ error: "email or password is not valid" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const currentUser = async (req, res) => {
  try {
    res.json( req.user);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
