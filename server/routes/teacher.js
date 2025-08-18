import express from 'express';
import Teacher from '../models/Teachers.js';
import TeacherProfile from '../models/TeacherProfile.js';

const router = express.Router();

// @route   GET api/teacher/profile/:facultyId
// @desc    Get teacher profile by faculty ID
// @access  Public (for now)
router.get('/profile/:facultyId', async (req, res) => {
    try {
        const { facultyId } = req.params;
        
        // Find teacher by faculty ID
        const teacher = await Teacher.findOne({ facultyId });
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Find profile
        let profile = await TeacherProfile.findOne({ teacher: teacher._id });
        
        // If no profile exists, create a basic one
        if (!profile) {
            profile = new TeacherProfile({
                teacher: teacher._id,
                name: `Teacher ${facultyId}`,
                department: 'Not specified',
                email: `${facultyId}@college.edu`,
                phone: '',
                role: 'Assistant Professor',
                level: 'Junior',
                collegeOfGraduation: '',
                classesInCharge: [],
                timeTableLink: '',
                profilePic: ''
            });
            await profile.save();
        }

        // Return profile with additional fields
        const profileData = {
            ...profile.toObject(),
            facultyId: teacher.facultyId
        };

        res.json(profileData);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT api/teacher/profile/:facultyId
// @desc    Update teacher profile
// @access  Public (for now)
router.put('/profile/:facultyId', async (req, res) => {
    try {
        const { facultyId } = req.params;
        const updateData = req.body;
        
        // Find teacher
        const teacher = await Teacher.findOne({ facultyId });
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Update profile
        const profile = await TeacherProfile.findOneAndUpdate(
            { teacher: teacher._id },
            { $set: updateData },
            { new: true, upsert: true }
        );

        const profileData = {
            ...profile.toObject(),
            facultyId: teacher.facultyId
        };

        res.json(profileData);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   POST api/teacher/register
// @desc    Register a new teacher
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { facultyId, password, name, department, role } = req.body;

        // Check if teacher already exists
        let teacher = await Teacher.findOne({ facultyId });
        if (teacher) {
            return res.status(400).json({ message: 'Teacher already exists' });
        }

        // Create new teacher
        teacher = new Teacher({
            facultyId,
            password // Will be hashed by pre-save middleware if implemented
        });

        await teacher.save();

        // Create profile
        const profile = new TeacherProfile({
            teacher: teacher._id,
            name,
            department,
            role: role || 'Assistant Professor',
            email: `${facultyId}@college.edu`
        });

        await profile.save();

        res.status(201).json({ message: 'Teacher registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;