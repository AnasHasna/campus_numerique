const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        autopopulate: true,
      },
    ],
    files: [
      { type: mongoose.Schema.Types.ObjectId, ref: "File", autopopulate: true },
    ],
  },
  { timestamps: true }
);

moduleSchema.plugin(require("mongoose-autopopulate"));

const Module = mongoose.model("Module", moduleSchema);

module.exports = Module;
