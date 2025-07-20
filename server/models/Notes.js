import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  contentLink: { type: String, required: true },
  subjectCode: { type: String, required: true, index: true },
  facultyId: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Notes', notesSchema);
