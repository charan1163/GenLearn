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
    subjectsHandled: {
        type: [String],
        default: [],
    },
    contactNumber: {
        type: String,
    },
    email: {
        type: String,
    },
});

const TeacherProfile = mongoose.model('TeacherProfile', TeacherProfileSchema);

export default TeacherProfile;