const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  phone: { type: String },
  address: { type: String },
  course: { type: String },
  dob: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("Student", StudentSchema);
