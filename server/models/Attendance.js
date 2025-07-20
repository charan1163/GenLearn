import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true, index: true },
  subjectCode: { type: String, required: true, index: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent'], required: true }
});

export default mongoose.model('Attendance', attendanceSchema);
