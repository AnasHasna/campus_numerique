const asyncHandler = require("express-async-handler");
const File = require("../models/filesModel");

/**
 * @description     Download file
 * @router          /files/:fileId/download
 * @method          GET
 * @access          public
 */

module.exports.downloadFileController = asyncHandler(async (req, res) => {
  const { fileId } = req.params;
  const file = await File.findById(fileId);

  if (file) {
    res.sendFile(file.path);
  } else {
    res.status(404).json({ success: false, message: "Fichier introuvable" });
  }
});
