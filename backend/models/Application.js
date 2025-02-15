const mongoose= require("mongoose")

const ApplicationSchema= mongoose.Schema({
    student:{type: mongoose.Schema.Types.ObjectId, ref:"Student", required: true },
    courseName:{type: String , required: true},
    appliedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Application", ApplicationSchema);