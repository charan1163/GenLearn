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
    semester: {
        type: String,
        default: '1',
    },
    year: {
        type: Number,
        default: 1,
    },
    section: {
        type: String,
        default: 'A',
    },
    phone: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: '',
    },
    profilePic: {
        type: String,
        default: '',
    },
    linkedin: {
        type: String,
        default: '',
    },
    github: {
        type: String,
        default: '',
    },
    portfolio: {
        type: String,
        default: '',
    },
    resumeLink: {
        type: String,
        default: '',
    },
    cvLink: {
        type: String,
        default: '',
    },
    coverLetterLink: {
        type: String,
        default: '',
    },
    certificates: [{
        name: String,
        link: String
    }]
}, {
    timestamps: true
});

const StudentProfile = mongoose.model('StudentProfile', StudentProfileSchema);

export default StudentProfile;