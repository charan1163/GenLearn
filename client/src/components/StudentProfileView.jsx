import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StudentProfileView.css'; // Import the new CSS file

function StudentProfileView() {
  const navigate = useNavigate();
  const [studentProfile, setStudentProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loggedInRollNumber = localStorage.getItem('loggedInRollNumber');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!loggedInRollNumber) {
        setError('No roll number found. Please log in again.');
        setLoading(false);
        navigate('/'); // Redirect to login
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/student/profile/${loggedInRollNumber}`);
        setStudentProfile(response.data);
      } catch (err) {
        console.error('Error fetching student profile for view:', err);
        setError('Failed to load profile details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [loggedInRollNumber, navigate]);

  if (loading) {
    return (
      <div className="profile-view-container loading">
        <p>Loading student profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-view-container error">
        <p>{error}</p>
        <button onClick={() => navigate('/student-dashboard')}>Go to Dashboard</button>
      </div>
    );
  }

  if (!studentProfile) {
    return (
      <div className="profile-view-container error">
        <p>Profile data not available.</p>
        <button onClick={() => navigate('/student-dashboard')}>Go to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="profile-view-container">
      {/* Personal Information Section */}
      <div className="personal-info-section">
        <h3>Personal Information:</h3>
        <p><strong>Name:</strong> {studentProfile.name}</p>
        <p><strong>Roll Number:</strong> {studentProfile.rollNumber}</p>
        <p><strong>Email:</strong> {studentProfile.email}</p>
        <p><strong>Phone No:</strong> {studentProfile.phone || 'N/A'}</p>
        <p><strong>Department:</strong> {studentProfile.department || 'N/A'}</p>
        <p><strong>Semester:</strong> {studentProfile.semester || 'N/A'}</p>
      </div>

      {/* Profile Picture Section */}
      <div className="profile-pic-section">
        <img
          src={studentProfile.profilePic || 'https://placehold.co/150x150/cccccc/000000?text=Profile'}
          alt="Profile Pic"
          className="profile-pic"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/cccccc/000000?text=Profile"; }}
        />
      </div>

      {/* Combined Links & Documents Section */}
      <div className="links-documents-card">
        <h3>Links & Documents:</h3>
        <div className="links-section">
          <h4>Links:</h4>
          <p><a href={studentProfile.linkedin || '#'} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
          <p><a href={studentProfile.github || '#'} target="_blank" rel="noopener noreferrer">GitHub</a></p>
          <p><a href={studentProfile.portfolio || '#'} target="_blank" rel="noopener noreferrer">Portfolio</a></p>
        </div>
        <div className="documents-section">
          <h4>Documents:</h4>
          <p><a href={studentProfile.resumeLink || '#'} target="_blank" rel="noopener noreferrer">Resume Link</a></p>
          <p><a href={studentProfile.cvLink || '#'} target="_blank" rel="noopener noreferrer">CV Link</a></p>
          <p><a href={studentProfile.coverLetterLink || '#'} target="_blank" rel="noopener noreferrer">Cover Letter Link</a></p>
        </div>
      </div>

      {/* Certificates Showcase Section */}
      <div className="certificates-showcase-section">
        <h3>Certificates Showcase:</h3>
        {studentProfile.certificates && studentProfile.certificates.length > 0 ? (
          <div className="certificate-list">
            {studentProfile.certificates.map((cert, index) => (
              <p key={index}>
                <a href={cert.link} target="_blank" rel="noopener noreferrer">
                  {cert.name}
                </a>
              </p>
            ))}
          </div>
        ) : (
          <p>No certificates added yet.</p>
        )}
      </div>
    </div>
  );
}

export default StudentProfileView;
