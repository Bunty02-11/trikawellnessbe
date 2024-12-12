const Faq = require("../../models/home/faq");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
// Create
const config = require("../../config/config");
// Configure AWS SDK

// Configure multer to handle file uploads

const createFaq = async (req, res) => {
  try {
    const document = new Faq({
      question: req.body.question,
      answer: req.body.answer,
    });
    const savedDocument = await document.save();
    res
      .status(200)
      .json({
        message: "FAQ saved successfully",
        document: savedDocument,
      });
  } catch (err) {
    console.log(err);
  }
};

// Read
const getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find({});
    res.send(faqs);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getFaqById = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return res.status(404).send();
    }
    res.send(faq);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update
const updateFaq = async (req, res) => {
  try {
    const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!faq) {
      return res.status(404).send();
    }
    res.send(faq);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete
const deleteFaq = async (req, res) => {
  try {
    const faq = await Faq.findByIdAndDelete(req.params.id);
    if (!faq) {
      return res.status(404).send();
    }
    res.send(faq);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  createFaq,
  getFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
};
