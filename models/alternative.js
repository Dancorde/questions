const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const alternativeSchema = new Schema({
  answer: {
    type: String,
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  },
});

module.exports = mongoose.model("Alternative", alternativeSchema);
