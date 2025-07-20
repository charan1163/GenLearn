import mongoose from 'mongoose';

const marksSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true, index: true },
  subjectCode: { type: String, required: true, index: true },
  marks: { type: Number, required: true },
  examType: { type: String, enum: ['mid1', 'mid2', 'internal', 'external'], required: true }
});

export default mongoose.model('Marks', marksSchema);
