import { Donatepost } from "../models/donatepost.js";

function fieldController(reqBody) {
  if (
    !reqBody.title ||
    !reqBody.description ||
    !reqBody.image ||
    !reqBody.date ||
    !reqBody.poster ||
    !reqBody.category
  ) {
    return res.status(400).send("Missing fields for donatepost");
  }
}

export const donatePostPOST = async (req, res) => {
  try {
    fieldController(req.body);

    const newDonatepost = req.body;
    const donatepost = await Donatepost.create(newDonatepost);

    return res.status(201).send(donatepost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const donatePostGET = async (req, res) => {
  try {
    const donateposts = await Donatepost.find({});

    return res.status(200).json(donateposts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const donatePostGETSearch = async (req, res) => {
  try {
    const searchString = req.params.string;
    const regex = new RegExp(searchString, 'i');
    const donatePosts = await Donatepost.find({title: regex});
    return res.status(200).json(donatePosts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const donatePostGETId = async (req, res) => {
  try {
    const donatepost = await Donatepost.findById(req.params.id);

    if (!donatepost) {
      return res.status(404).send("Donatepost not found");
    }

    return res.status(200).json(donatepost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const donatePostPUT = async (req, res) => {
  try {
    fieldController(req.body);

    const result = await Donatepost.findByIdAndUpdate(req.params.id, req.body);

    if (!result) {
      return res.status(404).send("Donatepost not found");
    }

    return res.status(204).send("Donatepost updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const donatePostDEL = async (req, res) => {
  try {
    const result = await Donatepost.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("Donatepost not found");
    }

    return res.status(204).send("Donatepost deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
