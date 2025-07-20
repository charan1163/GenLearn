const mongoose = require('mongoose');
// Filename: models/AssignmentSubmission.js
const assignmentSubmissionSchema = new mongoose.Schema({
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  submissionLink: String,
  submittedAt: Date,
  plagiarismScore: { type: Number, default: null },
  aiFeedback: { type: String, default: '' },
  analysis: { type: Object, default: {} },
  marks: { type: Number, default: null }
});

module.exports = mongoose.model('AssignmentSubmission', assignmentSubmissionSchema);
