const asyncHandler = require("express-async-handler");
const File = require("../models/filesModel");

/**
 * @description     Get all files in module
 * @router          /files/:moduleId/
 * @method          GET
 * @access          public
 */
module.exports.getAllFilesInModuleController = asyncHandler(
  async (req, res) => {
    const files = await File.find({
      module: req.params.moduleId,
    });
    res.status(200).json({ status: true, files });
  }
);

/**
 * @description     add file to module
 * @router          /files/:moduleId/
 * @method          POST
 * @access          private (teacher)
 */

module.exports.addFileToModuleController = asyncHandler(async (req, res) => {
  const { name, type } = req.body;

  // TODO: get the path of the file

  const file = new File({
    module: req.params.moduleId,
    name,
    type,
    //TODO: path
  });

  await file.save();
  res.status(201).json({ status: true, message: "Fichier créer avec succès" });
});
