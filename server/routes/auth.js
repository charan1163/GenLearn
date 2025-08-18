import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Student from '../models/Students.js';
import Teacher from '../models/Teachers.js';
import StudentProfile from '../models/StudentProfile.js';
import TeacherProfile from '../models/TeacherProfile.js';

const router = express.Router();

// @route   POST api/auth/login
// @desc    Authenticate user (student or teacher) & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { username, password, userType } = req.body;

    try {
        let user;
        let Model;
        let idField;

        // Determine which model to use based on userType
        if (userType === 'student') {
            Model = Student;
            idField = 'rollNumber';
        } else if (userType === 'teacher') {
            Model = Teacher;
            idField = 'facultyId';
        } else {
            return res.status(400).json({ msg: 'Invalid user type' });
        }

        // Check if user exists
        user = await Model.findOne({ [idField]: username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Get profile information
        let profile;
        if (userType === 'student') {
            profile = await StudentProfile.findOne({ student: user._id });
        } else {
            profile = await TeacherProfile.findOne({ teacher: user._id });
        }

        // Return success response with user info
        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                username: user[idField],
                userType: userType,
                idForProfile: user[idField], // Use for profile lookup
                name: profile?.name || 'User'
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;