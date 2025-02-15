const express = require("express")
const {applyForCourse, getStudentApplications}= require("../controllers/applicationContoller")
const authMiddleware =require("../middleware/authMiddleware")

const router= express.Router()

router.post("/apply", authMiddleware,applyForCourse)
router.get("/", authMiddleware,getStudentApplications)
module.exports = router;