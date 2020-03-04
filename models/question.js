const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  problem: {
    type: String,
    required: true
  },
  answer1: {
    type: String,
    required: true
  },
  answer2: {
    type: String,
    required: true
  },
  answer3: {
    type: String,
    required: true
  },
  answer4: {
    type: String,
    required: true
  },
  answer5: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Question", questionSchema);
