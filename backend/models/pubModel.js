const mongoose = require("mongoose");

const pubSchema = new mongoose.Schema(
  {
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        autopopulate: true,
      },
    ],
  },
  { timestamps: true }
);

const Pub = mongoose.model("Pub", pubSchema);

module.exports = Pub;
