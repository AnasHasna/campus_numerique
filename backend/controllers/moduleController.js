const asyncHandler = require("express-async-handler");
const { validateCreateModule, Module } = require("../models/moduleModel");

/**
 * @description     Get all modules
 * @router          /
 * @method          GET
 * @access          public
 */
module.exports.getAllModulesController = asyncHandler(async (req, res) => {
  const modules = await Module.find({
    teacherId: req.teacherId,
  });
  res.status(200).json({ status: true, modules });
});

/**
 * @description     create module
 * @router          /createmodule
 * @method          POST
 * @access          private (teacher)
 */

module.exports.createModuleController = asyncHandler(async (req, res) => {
  const { error } = validateCreateModule(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, teacherId } = req.body;

  const module = new Module({
    name,
    teacherId,
  });

  await module.save();
  res.status(201).json({ status: true, message: "Module créer avec succès" });
});
