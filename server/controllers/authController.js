// server/controllers/authController.js
const User = require('../models/User');

const loginUser = async (req, res) => {
  const { loginId, password } = req.body;

  try {
    const user = await User.findOne({ loginId });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // You can later add JWT/auth logic here
    res.status(200).json({ message: 'Login successful', userType: user.userType });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { loginUser };
