const Application = require("../models/Application");
const User = require("../models/User");

exports.applyForCourse = async (req, res) => {
    try {
        

        const userExists = await User.findById(req.user.id);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }
        const { courseName } = req.body
        if (!courseName) {
            return res.status(400).json({ message: "Course name is required" });
        }

        const application = new Application({
            student: req.user.id,
            courseName
        });

        await application.save();
        res.status(201).json(application);
    } catch (err) {
        console.log("server error",err)
        res.status(500).json({ message: "Server error"});
    }
};

exports.getStudentApplications = async (req, res) => {
    try {
        const applications = await Application.find({ student: req.user.id });
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
