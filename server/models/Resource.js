const mongoose = require('mongoose');
// Filename: models/Resource.js
const resourceSchema = new mongoose.Schema({
  title: String,
  type: { type: String, enum: ['internship', 'placement', 'hackathon', 'tech-event'] },
  link: String,
  sharedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date
});

module.exports = mongoose.model('Resource', resourceSchema);



const sharedResourcesSchema = new mongoose.Schema({
  subjectCode: { type: String, required: true, index: true },
  resourceLink: { type: String, required: true },
  uploadedBy: { type: String, required: true }
});

export default mongoose.model('SharedResources', sharedResourcesSchema);
