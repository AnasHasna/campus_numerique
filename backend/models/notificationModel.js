const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
      trim: true,
      autopopulate: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

notificationSchema.plugin(require("mongoose-autopopulate"));

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = { Notification };
