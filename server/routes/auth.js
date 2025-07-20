// server\routes\auth.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Students');
const Teacher = require('../models/Teachers');

router.post('/login', async (req, res) => {
  const { rollNumber, password, role } = req.body;

  console.log('Backend received:', { rollNumber, password, role });

  try {
    let user;

    if (role === 'student') {
      console.log('Querying Student with:', { rollNumber, password });
      user = await Student.findOne({ rollNumber, password });
      // --- ADD THIS LINE HERE ---
      console.log('Raw user object from DB (student query):', user);
    } else if (role === 'teacher') {
      console.log('Querying Teacher with:', { facultyId: rollNumber, password });
      user = await Teacher.findOne({ facultyId: rollNumber, password });
      // --- ADD THIS LINE HERE ---
      console.log('Raw user object from DB (teacher query):', user);
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;