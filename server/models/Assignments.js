import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  subjectCode: { type: String, required: true, index: true },
  facultyId: { type: String, required: true, index: true },
  assignmentType: { type: String, enum: ['pdf', 'image', 'link'], required: true },
  dueDate: { type: Date, required: true, index: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Assignment', assignmentSchema);
