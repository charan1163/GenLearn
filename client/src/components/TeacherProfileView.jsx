import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TeacherProfileView.css'; // Import the CSS file

function TeacherProfileView() {
  const navigate = useNavigate();
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loggedInFacultyId = localStorage.getItem('loggedInFacultyId');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!loggedInFacultyId) {
        setError('No faculty ID found. Please log in again.');
        setLoading(false);
        navigate('/'); // Redirect to login
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/teacher/profile/${loggedInFacultyId}`);
        setTeacherProfile(response.data);
      } catch (err) {
        console.error('Error fetching teacher profile for view:', err);
        setError('Failed to load profile details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [loggedInFacultyId, navigate]);

  if (loading) {
    return (
      <div className="profile-view-container loading">
        <p>Loading teacher profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-view-container error">
        <p>{error}</p>
        <button onClick={() => navigate('/teacher-dashboard')}>Go to Dashboard</button>
      </div>
    );
  }

  if (!teacherProfile) {
    return (
      <div className="profile-view-container error">
        <p>Profile data not available.</p>
        <button onClick={() => navigate('/teacher-dashboard')}>Go to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="profile-view-container">
      {/* Personal Information Section */}
      <div className="personal-info-section">
        <h3>Personal Information:</h3>
        <p><strong>Name:</strong> {teacherProfile.name}</p>
        <p><strong>Faculty ID:</strong> {teacherProfile.facultyId}</p>
        <p><strong>Email:</strong> {teacherProfile.email}</p>
        <p><strong>Phone No:</strong> {teacherProfile.phone || 'N/A'}</p>
        <p><strong>Department:</strong> {teacherProfile.department || 'N/A'}</p>
        <p><strong>Role:</strong> {teacherProfile.role || 'N/A'}</p>
        <p><strong>Level:</strong> {teacherProfile.level || 'N/A'}</p>
        <p><strong>College of Graduation:</strong> {teacherProfile.collegeOfGraduation || 'N/A'}</p>
      </div>

      {/* Profile Picture Section */}
      <div className="profile-pic-section">
        <img
          src={teacherProfile.profilePic || 'https://placehold.co/150x150/cccccc/000000?text=Teacher'}
          alt="Profile Pic"
          className="profile-pic"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/cccccc/000000?text=Teacher'; }}
        />
      </div>

      {/* Academic & Class Details Section */}
      <div className="academic-details-card">
        <h3>Academic & Class Details:</h3>
        <p><strong>Classes In Charge:</strong> {teacherProfile.classesInCharge && teacherProfile.classesInCharge.length > 0 ? teacherProfile.classesInCharge.join(', ') : 'N/A'}</p>
        <p><strong>Time Table:</strong>
          {teacherProfile.timeTableLink ? (
            <a href={teacherProfile.timeTableLink} target="_blank" rel="noopener noreferrer">View Time Table</a>
          ) : (
            ' N/A'
          )}
        </p>
      </div>

      {/* Other Information Section */}
      <div className="other-teacher-info-section">
        <h3>Other Information:</h3>
        <p>This section can be used for additional teacher-specific details.</p>
      </div>
    </div>
  );
}

export default TeacherProfileView;
