const asyncHandler = require("express-async-handler");
const {
  validateCreateModule,
  Module,
  validateGetALLModules,
} = require("../models/moduleModel");
const { Student } = require("../models/studentModel");
const Mark = require("../models/markModel");
const File = require("../models/filesModel");

/**
 * @description     Get all modules
 * @router          /
 * @method          GET
 * @access          public
 */
module.exports.getAllModulesController = asyncHandler(async (req, res) => {
  const { error } = validateGetALLModules(req.body);
  if (error)
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  const { teacherId } = req.body;

  const modules = await Module.find({
    teacherId,
  });
  res.status(200).json({ status: true, modules });
});

/**
 * @description     create module
 * @router          /
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

/**
 * @description     Get statistiques module
 * @router          /:moduleId/statistiques
 * @method          GET
 * @access          private (teacher)
 */
module.exports.getStatistiquesModuleController = asyncHandler(
  async (req, res) => {
    const { moduleId } = req.params;

    const module = await Module.findById(moduleId);
    if (!module)
      return res
        .status(400)
        .json({ status: false, message: "Module introuvable" });

    // ====================================
    // get the number of docs
    const files = await File.find({
      module: moduleId,
    });
    // get the number of cours/tds/tps/exams
    let cours = 0;
    let tds = 0;
    let tps = 0;
    let exams = 0;
    //TODO: get the number of downloads
    for (let i = 0; i < files.length; i++) {
      if (files[i].type === "cours") {
        cours++;
      }
      if (files[i].type === "td") {
        tds++;
      }
      if (files[i].type === "tp") {
        tps++;
      }
      if (files[i].type === "exam") {
        exams++;
      }
    }

    // ====================================
    // get the students
    let students = module.students;
    // get the students who have validated/not validate/less than 7
    // get note max/min/avg
    let studentsValidated = [];
    let studentsNotValidated = [];
    let studentLessThan7 = [];
    let max = 0;
    let min = 20;
    let avg = 0;

    if (students.length === 0) {
      min = 0;
    }

    for (let i = 0; i < students.length; i++) {
      let mark = await Mark.findOne({
        studentId: students[i],
        moduleId,
      });
      if (mark) {
        if (mark.mark >= 12) {
          studentsValidated.push(students[i]);
        }
        if (mark.mark < 12) {
          studentsNotValidated.push(students[i]);
        }
        if (mark.mark < 7) {
          studentLessThan7.push(students[i]);
        }
        if (mark.mark > max) {
          max = mark.mark;
        }
        if (mark.mark < min) {
          min = mark.mark;
        }
        avg += mark.mark;
      }
    }
    avg = avg / students.length;

    res.status(200).json({
      status: true,
      statistiques: {
        files: {
          cours,
          tds,
          tps,
          exams,
        },
        students: {
          students,
          studentsValidated,
          studentsNotValidated,
          studentLessThan7,
        },
        marks: {
          max,
          min,
          avg,
        },
      },
    });
  }
);
