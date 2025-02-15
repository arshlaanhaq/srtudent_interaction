const Student = require("../models/Students");

exports.getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) return res.status(404).json({ message: "Student profile not found" });

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateStudentProfile = async (req, res) => {
  try {
    let student = await Student.findOne({ user: req.user.id });

    if (!student) {
      student = new Student({ user: req.user.id, ...req.body });
    } else {
      Object.assign(student, req.body);
    }

    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
