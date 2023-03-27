const Joi = require("joi");
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
        default: [],
      },
    ],
    files: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        autopopulate: true,
        default: [],
      },
    ],
  },
  { timestamps: true }
);

moduleSchema.plugin(require("mongoose-autopopulate"));

const Module = mongoose.model("Module", moduleSchema);

// validate create module
const validateCreateModule = (module) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    teacherId: Joi.string().required(),
  });
  return schema.validate(module);
};

module.exports = { Module, validateCreateModule };
