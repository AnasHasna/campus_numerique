const mongoose = require("mongoose");

const markSchema = new mongoose.Schema({
  mark: { type: Number, required: true, trim: true },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    autopopulate: true,
  },
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
});

markSchema.plugin(require("mongoose-autopopulate"));

const Mark = mongoose.model("Mark", markSchema);

module.exports = Mark;
