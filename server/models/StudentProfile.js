import mongoose from 'mongoose';

const StudentProfileSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
    },
    email: {
        type: String,
    },
});

const StudentProfile = mongoose.model('StudentProfile', StudentProfileSchema);

export default StudentProfile;