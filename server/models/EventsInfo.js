import mongoose from 'mongoose';

const eventsInfoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true, index: true },
  createdBy: { type: String, required: true },
  reactions: {
    love: { type: [String], default: [] },
    celebrate: { type: [String], default: [] },
    curious: { type: [String], default: [] },
    insightful: { type: [String], default: [] },
    dislike: { type: [String], default: [] }
  }
}, { timestamps: true });

export default mongoose.model('EventInfo', eventsInfoSchema);
