import bcrypt from "bcrypt";
import mongoose from "mongoose";
import validator from "validator";
import crypto from "crypto"

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false
    },
    emailToken: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

//signup method
UserSchema.statics.signup = async function (
  name,
  email,
  password
) {
  if (!email || !password || !name) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }

  //check if email exists
  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const token = crypto.randomBytes(64).toString("hex")
  

  const user = await this.create({
    name,
    email,
    password: hash,
    photo: "",
    emailToken: token
  });

  return user;
};

//login method
UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  } else {
    // redundant but we should get rid of errors eventually
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error("Incorrect password");
    }

    return user;
  }
};

export const User = mongoose.model("User", UserSchema);