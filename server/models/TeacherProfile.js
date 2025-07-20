// TeacherProfile.js
const mongoose = require('mongoose');

const teacherProfileSchema = new mongoose.Schema({
  facultyId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String },
  department: { type: String },
  profilePic: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('TeacherProfile', teacherProfileSchema);