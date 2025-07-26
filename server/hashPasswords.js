import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Student from './models/Students.js';
import Teacher from './models/Teachers.js';

dotenv.config();

const hashPasswords = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected for hashing...');

        const saltRounds = 10;

        // Hash Student Passwords
        const students = await Student.find({ password: { $not: /^\$2[abxy]?\$/ } });
        for (const student of students) {
            const hashedPassword = await bcrypt.hash(student.password, saltRounds);
            student.password = hashedPassword;
            await student.save();
            console.log(`Hashed password for student: ${student.rollNumber}`);
        }

        // Hash Teacher Passwords
        const teachers = await Teacher.find({ password: { $not: /^\$2[abxy]?\$/ } });
        for (const teacher of teachers) {
            const hashedPassword = await bcrypt.hash(teacher.password, saltRounds);
            teacher.password = hashedPassword;
            await teacher.save();
            console.log(`Hashed password for teacher: ${teacher.facultyId}`);
        }

        console.log('Password hashing complete.');
    } catch (error) {
        console.error('Error hashing passwords:', error);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB disconnected.');
    }
};

hashPasswords();