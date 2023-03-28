const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentsModel");
const { find } = require("../models/pubModel");
const Pub = require("../models/pubModel");

/**
 * @description     Add pub 
 * @router          /pub/
 * @method          POST
 * @access          public

*/

module.exports.createPubController = asyncHandler(async (req, res) => {
  const { moduleId, content } = req.body;

  const pub = await Pub.create({
    moduleId,
    content,
  });

  res
    .status(201)
    .json({ status: true, message: "Publication créer avec succès" });
});

/**
 * @description     Get all pub
 * @router          /pub/
 * @method          GET
 * @access          public
 */

module.exports.getAllPubController = asyncHandler(async (req, res) => {
  const { moduleId } = req.body;
  const pubs = await Pub.find({ moduleId });

  res.status(200).json({ status: true, pubs });
});
