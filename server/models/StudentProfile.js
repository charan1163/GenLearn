const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String },
  department: { type: String },
  semester: { type: Number },
  profilePic: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('StudentProfile', studentProfileSchema);