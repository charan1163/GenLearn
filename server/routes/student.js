import express from 'express';
import auth from '../middleware/auth.js';
import StudentProfile from '../models/StudentProfile.js';

const router = express.Router();

// @route   GET api/student/profile
// @desc    Get current student's profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
    try {
        // req.user.id is from the auth middleware's decoded token
        const profile = await StudentProfile.findOne({ student: req.user.id }).populate('student', ['rollNumber']);

        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found for this student' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;