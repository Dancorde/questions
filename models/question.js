const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  problem: {
    type: String,
    required: true
  },
  alternatives: [
    {
      type: Schema.Types.ObjectId,
      ref: "Alternative"
    }
  ]
});

module.exports = mongoose.model("Question", questionSchema);
