import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Assuming Login.css is in the same directory

function Login() {
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const [loginMessage, setLoginMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoginMessage({ type: '', text: '' }); // Clear previous messages
    setIsLoading(true);

    try {
      console.log('Frontend sending:', { rollNumber, password, role });
      const response = await axios.post('/api/auth/login', {
        username: rollNumber,
        password,
        userType: role
      });

      setLoginMessage({ type: 'success', text: response.data.message });

      // --- Store ID and Redirect based on role ---
      if (response.data.user && response.data.user.userType === 'student') {
        localStorage.setItem('loggedInRollNumber', response.data.user.idForProfile); // Use idForProfile
        navigate('/student-dashboard');
      } else if (response.data.user && response.data.user.userType === 'teacher') {
        localStorage.setItem('loggedInFacultyId', response.data.user.idForProfile); // Store facultyId
        navigate('/teacher-dashboard');
      } else {
        setLoginMessage({ type: 'error', text: 'Login successful, but unknown user type.' });
      }
      // --- End Store ID and Redirect ---

      setRollNumber('');
      setPassword('');

    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || error.request ? 'Network error.' : 'An unexpected error occurred.';
      setLoginMessage({ type: 'error', text: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* GenLearn Logo */}
      <img
        src="https://placehold.co/100x100/007bff/ffffff?text=GL"
        alt="GenLearn Logo"
        className="login-logo"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/cccccc/000000?text=Logo"; }}
      />

      {/* Message Box for Success/Error */}
      {loginMessage.text && (
        <div className={`login-message ${loginMessage.type} show`} role="alert">
          {loginMessage.text}
        </div>
      )}

      <label>Roll Number / Faculty ID</label>
      <input
        type="text"
        placeholder="Enter your ID"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
        required
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <label>Role</label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>

      <button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <svg className="loading-spinner" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4.75A7.25 7.25 0 004.75 12h-1.5A8.75 8.75 0 0112 3.25v1.5zm7.69 6.75h1.5A8.75 8.75 0 0112 20.75v-1.5a7.25 7.25 0 007.69-7.25z" opacity=".2"/>
              <path d="M12 4.75V3.25a8.75 8.75 0 00-8.75 8.75h1.5A7.25 7.25 0 0112 4.75z"/>
            </svg>
            Logging in...
          </>
        ) : (
          'Login'
        )}
      </button>
    </form>
  );
}

export default Login;
