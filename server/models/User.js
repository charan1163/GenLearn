const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  loginId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['student', 'teacher'],
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
