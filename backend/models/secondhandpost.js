import mongoose from "mongoose";

const SecondhandPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SecondhandPost = mongoose.model(
  "SecondhandPost",
  SecondhandPostSchema
);
