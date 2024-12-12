const Introduction = require("../../models/home/introduction");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
// Create
const config = require("../../config/config");
// Configure AWS SDK

// Configure multer to handle file uploads

const createIntroduction = async (req, res) => {
  try {
    const document = new Introduction({
      name: req.body.name,
      message: req.body.message,
      rating: req.body.rating,
      image: req.body.image,
      video: req.body.video,
      isActive: req.body.isActive,
    });
    console.log(document);
    const savedDocument = await document.save();
    res
      .status(200)
      .json({
        message: "File uploaded and document saved successfully",
        document: savedDocument,
      });
  } catch (err) {
    console.log(err);
  }
};

// Read
const getIntroductions = async (req, res) => {
  try {
    const introductions = await Introduction.find({});
    res.send(introductions);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getIntroductionById = async (req, res) => {
  try {
    const introduction = await Introduction.findById(req.params.id);
    if (!introduction) {
      return res.status(404).send();
    }
    res.send(introduction);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update
const updateIntroduction = async (req, res) => {
  try {
    const introduction = await Introduction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!introduction) {
      return res.status(404).send();
    }
    res.send(introduction);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete
const deleteIntroduction = async (req, res) => {
  try {
    const introduction = await Introduction.findByIdAndDelete(req.params.id);
    if (!introduction) {
      return res.status(404).send();
    }
    res.send(introduction);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  createIntroduction,
  getIntroductions,
  getIntroductionById,
  updateIntroduction,
  deleteIntroduction,
};
