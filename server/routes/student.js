import express from 'express';
import Student from '../models/Students.js';
import StudentProfile from '../models/StudentProfile.js';

const router = express.Router();

// @route   GET api/student/profile/:rollNumber
// @desc    Get student profile by roll number
// @access  Public (for now)
router.get('/profile/:rollNumber', async (req, res) => {
    try {
        const { rollNumber } = req.params;
        
        // Find student by roll number
        const student = await Student.findOne({ rollNumber });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Find profile
        let profile = await StudentProfile.findOne({ student: student._id });
        
        // If no profile exists, create a basic one
        if (!profile) {
            profile = new StudentProfile({
                student: student._id,
                name: `Student ${rollNumber}`,
                department: 'Not specified',
                year: 1,
                section: 'A',
                email: `${rollNumber}@college.edu`,
                phone: '',
                semester: '1',
                profilePic: '',
                linkedin: '',
                github: '',
                portfolio: '',
                resumeLink: '',
                cvLink: '',
                coverLetterLink: '',
                certificates: []
            });
            await profile.save();
        }

        // Return profile with additional fields
        const profileData = {
            ...profile.toObject(),
            rollNumber: student.rollNumber
        };

        res.json(profileData);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT api/student/profile/:rollNumber
// @desc    Update student profile
// @access  Public (for now)
router.put('/profile/:rollNumber', async (req, res) => {
    try {
        const { rollNumber } = req.params;
        const updateData = req.body;
        
        // Find student
        const student = await Student.findOne({ rollNumber });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Update profile
        const profile = await StudentProfile.findOneAndUpdate(
            { student: student._id },
            { $set: updateData },
            { new: true, upsert: true }
        );

        const profileData = {
            ...profile.toObject(),
            rollNumber: student.rollNumber
        };

        res.json(profileData);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   POST api/student/register
// @desc    Register a new student
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { rollNumber, password, name, department, year, section } = req.body;

        // Check if student already exists
        let student = await Student.findOne({ rollNumber });
        if (student) {
            return res.status(400).json({ message: 'Student already exists' });
        }

        // Create new student
        student = new Student({
            rollNumber,
            password // Will be hashed by pre-save middleware if implemented
        });

        await student.save();

        // Create profile
        const profile = new StudentProfile({
            student: student._id,
            name,
            department,
            year,
            section,
            email: `${rollNumber}@college.edu`
        });

        await profile.save();

        res.status(201).json({ message: 'Student registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;