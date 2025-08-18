import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Student from './models/Students.js';
import Teacher from './models/Teachers.js';
import StudentProfile from './models/StudentProfile.js';
import TeacherProfile from './models/TeacherProfile.js';

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/genlearn');
        console.log('MongoDB connected for seeding...');

        // Clear existing data
        await Student.deleteMany({});
        await Teacher.deleteMany({});
        await StudentProfile.deleteMany({});
        await TeacherProfile.deleteMany({});

        const saltRounds = 10;

        // Create sample students
        const students = [
            { rollNumber: '21CS001', password: 'password123' },
            { rollNumber: '21CS002', password: 'password123' },
            { rollNumber: '21IT001', password: 'password123' },
        ];

        for (const studentData of students) {
            const hashedPassword = await bcrypt.hash(studentData.password, saltRounds);
            const student = new Student({
                rollNumber: studentData.rollNumber,
                password: hashedPassword
            });
            await student.save();

            // Create corresponding profile
            const profile = new StudentProfile({
                student: student._id,
                name: `Student ${studentData.rollNumber}`,
                department: studentData.rollNumber.includes('CS') ? 'Computer Science' : 'Information Technology',
                semester: '6',
                year: 3,
                section: 'A',
                email: `${studentData.rollNumber.toLowerCase()}@college.edu`,
                phone: '+91 9876543210',
                profilePic: 'https://placehold.co/150x150/007bff/ffffff?text=' + studentData.rollNumber.slice(-3),
                linkedin: `https://linkedin.com/in/${studentData.rollNumber.toLowerCase()}`,
                github: `https://github.com/${studentData.rollNumber.toLowerCase()}`,
                portfolio: `https://${studentData.rollNumber.toLowerCase()}.dev`,
                certificates: [
                    { name: 'JavaScript Certification', link: 'https://example.com/cert1' },
                    { name: 'React Certification', link: 'https://example.com/cert2' }
                ]
            });
            await profile.save();
            console.log(`Created student: ${studentData.rollNumber}`);
        }

        // Create sample teachers
        const teachers = [
            { facultyId: 'FAC001', password: 'teacher123' },
            { facultyId: 'FAC002', password: 'teacher123' },
        ];

        for (const teacherData of teachers) {
            const hashedPassword = await bcrypt.hash(teacherData.password, saltRounds);
            const teacher = new Teacher({
                facultyId: teacherData.facultyId,
                password: hashedPassword
            });
            await teacher.save();

            // Create corresponding profile
            const profile = new TeacherProfile({
                teacher: teacher._id,
                name: `Dr. Teacher ${teacherData.facultyId}`,
                department: 'Computer Science',
                role: 'Assistant Professor',
                level: 'Senior',
                email: `${teacherData.facultyId.toLowerCase()}@college.edu`,
                phone: '+91 9876543210',
                collegeOfGraduation: 'IIT Delhi',
                classesInCharge: ['21CS-A', '21CS-B'],
                timeTableLink: 'https://example.com/timetable',
                profilePic: 'https://placehold.co/150x150/28a745/ffffff?text=' + teacherData.facultyId.slice(-3)
            });
            await profile.save();
            console.log(`Created teacher: ${teacherData.facultyId}`);
        }

        console.log('Sample data seeded successfully!');
        console.log('\nLogin credentials:');
        console.log('Students: 21CS001, 21CS002, 21IT001 (password: password123)');
        console.log('Teachers: FAC001, FAC002 (password: teacher123)');

    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB disconnected.');
    }
};

seedData();