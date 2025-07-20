const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String
});

module.exports = mongoose.model('Student', studentSchema);
