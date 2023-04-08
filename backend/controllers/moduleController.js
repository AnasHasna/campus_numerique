const asyncHandler = require("express-async-handler");
const {
  validateCreateModule,
  Module,
  validateGetALLModules,
} = require("../models/moduleModel");
const { Student } = require("../models/studentModel");
const Mark = require("../models/markModel");
const File = require("../models/filesModel");
const Invitation = require("../models/invitationModel");

/**
 * @description     Get all modules
 * @router          /modules
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
 * @router          /modules
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
 * @description     Get module info
 * @router          /modules/:moduleId
 * @method          GET
 * @access          public
 */
module.exports.getModuleInfoController = asyncHandler(async (req, res) => {
  const { moduleId } = req.params;
  const module = await Module.findById(moduleId);
  if (!module)
    return res
      .status(404)
      .json({ status: false, message: "Module introuvable" });
  res.status(200).json({ status: true, module });
});

/**
 * @description     Get statistiques module
 * @router          /modules/:moduleId/statistiques
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
    let downloads = 0;
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
      downloads += files[i].downloadNumber;
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
    } else {
      for (let i = 0; i < students.length; i++) {
        let mark = await Mark.findOne({
          student: students[i],
          module: moduleId,
        });
        if (mark) {
          if (mark.mark >= 12) {
            studentsValidated.push(mark);
          }
          if (mark.mark < 12) {
            studentsNotValidated.push(mark);
          }
          if (mark.mark < 7) {
            studentLessThan7.push(mark);
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
    }

    // get etudiants who whave the max / min
    const maxMark = await Mark.find({
      module: moduleId,
      mark: max,
    });
    const minMark = await Mark.find({
      module: moduleId,
      mark: min,
    });

    res.status(200).json({
      status: true,
      statistiques: {
        files: {
          docs: files.length,
          cours,
          tds,
          tps,
          exams,
          downloads,
        },
        students: {
          students,
          studentsValidated,
          studentsNotValidated,
          studentLessThan7,
        },
        marks: {
          max: maxMark,
          min: minMark,
          avg,
        },
      },
    });
  }
);

/**
 * @description     Get all Student in module
 * @router          /modules/:moduleId/students
 * @method          GET
 * @access          private (teacher)
 */

module.exports.getAllStudentsInModuleController = asyncHandler(
  async (req, res) => {
    const { moduleId } = req.params;

    const module = await Module.findById(moduleId);
    if (!module)
      return res
        .status(400)
        .json({ status: false, message: "Module introuvable" });

    const students = module.students;

    res.status(200).json({ status: true, students });
  }
);

/**
 * @description     Get Notes module
 * @router          /modules/:moduleId/notes
 * @method          GET
 * @access          private (teacher)
 */
module.exports.getNotesModuleController = asyncHandler(async (req, res) => {
  const { moduleId } = req.params;
  const notes = await Mark.find({
    module: moduleId,
  });
  res.status(200).json({ status: true, notes });
});

/**
 * @description     Add Note module
 * @router          /modules/:moduleId/notes
 * @method          POST
 * @access          private (teacher)
 */

module.exports.addNoteModuleController = asyncHandler(async (req, res) => {
  const { moduleId } = req.params;
  const { studentId, mark } = req.body;
  await Mark.create({
    student: studentId,
    module: moduleId,
    mark,
  });
  res.status(201).json({ status: true, message: "Note ajoutée avec succès" });
});

/**
 * @description     Update Note module
 * @router          /modules/:moduleId/notes
 * @method          PUT
 * @access          private (teacher)
 */

module.exports.updateNoteModuleController = asyncHandler(async (req, res) => {
  const { moduleId } = req.params;
  const { studentId, mark } = req.body;
  await Mark.findOneAndUpdate(
    {
      student: studentId,
      module: moduleId,
    },
    {
      mark,
    }
  );
  res.status(201).json({ status: true, message: "Note modifiée avec succès" });
});

/**
 * @description     Get all invitations
 * @router          /modules/:moduleId/invitations
 * @method          GET
 * @access          private (teacher)
 */

module.exports.getAllInvitationsController = asyncHandler(async (req, res) => {
  const { moduleId } = req.params;

  const invitations = await Invitation.find({
    module: moduleId,
  });
  res.status(200).json({ status: true, invitations });
});

/**
 * @description     Confirm invitation
 * @router          /modules/:moduleId/invitations/:invitationId
 * @method          POST
 * @access          private (teacher)
 */

module.exports.confirmInvitationController = asyncHandler(async (req, res) => {
  const { moduleId, invitationId } = req.params;

  const { studentId } = req.body;

  const module = await Module.findById(moduleId);
  const students = module.students;

  students.push(studentId);
  await module.save();

  await Invitation.findByIdAndDelete(invitId);

  res.status(200).json({
    status: true,
    message: "Invitation confirmée avec succès",
  });
});

/**
 * @description     Rejet invitation
 * @router          /modules/:moduleId/invitations/:invitationId
 * @method          DELETE
 * @access          private (teacher)
 */

module.exports.rejectInvitationController = asyncHandler(async (req, res) => {
  const { invitationId } = req.params;

  await Invitation.findByIdAndDelete(invitId);

  res.status(200).json({
    status: true,
    message: "Invitation rejetée avec succès",
  });
});
