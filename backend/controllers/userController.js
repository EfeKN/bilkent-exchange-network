import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { UserProfile } from "../models/userProfile.js";
import bcrypt from "bcrypt";

const createToken = (_id) => {
  return jwt.sign({ _id }, "bununbirsecretolmasılazımnormalde", {
    expiresIn: "2d",
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    const _id = user._id;

    res.status(200).json({ email, _id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);

    const token = createToken(user._id);
    const _id = user._id;

    await UserProfile.createProfile(_id, username, email);

    res.status(200).json({ email, _id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const emailToken = req.body.emailToken;

    if (!emailToken) {
      return res.status(404).json("Email token not found");
    }

    const user = User.findOne({ emailToken });

    if (user) {
      user.emailToken = null;
      user.isVerified = true;
      await user.save();
      const token = createToken(user._id);

      res.status(200).json({ user, token });
    } else {
      res.status(404).json("Email verification failed");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const forgotPassword = async (req, res) => {
  const {email, password} = req.body
  try{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
   
    const user = await User.findOneAndUpdate(
      {email: email},
      {password: hash}
    )
    res.status(200).json({user})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
  
}
