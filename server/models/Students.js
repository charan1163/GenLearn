import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
    rollNumber: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const Student = mongoose.model('Student', StudentSchema);

export default Student;