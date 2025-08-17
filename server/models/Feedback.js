import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  facultyId: { type: String, required: true, index: true },
  rollNumber: { type: String, required: true, index: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String }
});

export default mongoose.model('Feedback', feedbackSchema);
