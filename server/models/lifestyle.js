const mongoose = require("mongoose");

const lifestyleSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: 1,
    maxlength: 100
  }
});

const Lifestyle = mongoose.model("Lifestyle", lifestyleSchema);

module.exports = { Lifestyle };
