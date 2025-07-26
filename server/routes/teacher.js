import express from 'express';
import auth from '../middleware/auth.js';
import TeacherProfile from '../models/TeacherProfile.js';

const router = express.Router();

// @route   GET api/teacher/profile
// @desc    Get current teacher's profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
    try {
        // req.user.id is from the auth middleware's decoded token
        const profile = await TeacherProfile.findOne({ teacher: req.user.id }).populate('teacher', ['facultyId']);

        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found for this teacher' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/teacher/profile
// @desc    Update current teacher's profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
    const { name, department, contactNumber, email } = req.body;

    const profileFields = {};
    if (name) profileFields.name = name;
    if (department) profileFields.department = department;
    if (contactNumber) profileFields.contactNumber = contactNumber;
    if (email) profileFields.email = email;

    try {
        let profile = await TeacherProfile.findOne({ teacher: req.user.id });

        if (profile) {
            // Update
            profile = await TeacherProfile.findOneAndUpdate(
                { teacher: req.user.id },
                { $set: profileFields },
                { new: true }
            ).populate('teacher', ['facultyId']);

            return res.json(profile);
        }

        // This case should ideally not be hit if profiles are created on user registration
        return res.status(404).json({ msg: 'Profile not found' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;