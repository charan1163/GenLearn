import mongoose from 'mongoose';

const TeacherProfileSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
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
    phone: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: '',
    },
    role: {
        type: String,
        default: 'Assistant Professor',
    },
    level: {
        type: String,
        default: 'Junior',
    },
    collegeOfGraduation: {
        type: String,
        default: '',
    },
    classesInCharge: {
        type: [String],
        default: [],
    },
    timeTableLink: {
        type: String,
        default: '',
    },
    profilePic: {
        type: String,
        default: '',
    },
}, {
    timestamps: true
});

const TeacherProfile = mongoose.model('TeacherProfile', TeacherProfileSchema);

export default TeacherProfile;