import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Student from '../models/Students.js';
import Teacher from '../models/Teachers.js';

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
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // User matched, create JWT payload
        const payload = {
            user: {
                id: user.id,
                role: userType
            }
        };

        // Sign the token
        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'your_default_jwt_secret', // Use a secret from .env in production
            { expiresIn: 3600 }, // Expires in 1 hour
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        id: user.id,
                        username: user[idField],
                        userType: userType
                    }
                });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

export default router;