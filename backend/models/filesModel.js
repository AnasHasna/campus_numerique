const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  path: { type: String, required: true, trim: true },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
