import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  subjectCode: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  facultyId: { type: String, required: true }
});

export default mongoose.model('Subject', subjectSchema);
