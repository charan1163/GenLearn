import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TeacherProfileView from './TeacherProfileView';
import UpdateProfileForm from './UpdateProfileForm';
import './StudentDashboard.css'; // Reusing StudentDashboard.css for common dashboard styles

function TeacherDashboard() {
  const navigate = useNavigate();
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState('');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('overview');

  const loggedInFacultyId = localStorage.getItem('loggedInFacultyId');

  useEffect(() => {
    const fetchTeacherProfile = async () => {
      if (!loggedInFacultyId) {
        setProfileError('No faculty ID found. Please log in again.');
        setLoadingProfile(false);
        navigate('/');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/teacher/profile/${loggedInFacultyId}`);
        setTeacherProfile(response.data);
      } catch (error) {
        console.error('Error fetching teacher profile:', error);
        setProfileError('Failed to load teacher profile. Please try again.');
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchTeacherProfile();
  }, [loggedInFacultyId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInFacultyId');
    console.log('Logging out...');
    navigate('/');
  };

  const renderContent = () => {
    switch (activeContent) {
      case 'overview':
        return (
          <div className="content-section overview-notifications">
            <h2>Welcome, {teacherProfile?.name || 'Teacher'}!</h2>
            <p>This is your teacher dashboard overview.</p>
          </div>
        );
      case 'view-profile':
        return <TeacherProfileView />;
      case 'update-profile':
        return <UpdateProfileForm userType="teacher" />;
      default:
        return (
          <div className="content-section overview-notifications">
            <h2>Welcome, {teacherProfile?.name || 'Teacher'}!</h2>
            <p>This is your teacher dashboard overview.</p>
          </div>
        );
    }
  };

  const hideSidebar = activeContent === 'view-profile' || activeContent === 'update-profile';

  return (
    <div className="student-dashboard-container">
      {/* Top Navbar */}
      <nav className="navbar top-navbar">
        <div className="navbar-brand-home" onClick={() => setActiveContent('overview')}>
          GenLearn
        </div>
        <div className="navbar-profile">
          <img
            src={teacherProfile?.profilePic || 'https://placehold.co/100x100/cccccc/000000?text=T'}
            alt="Profile"
            className="profile-image"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          />
          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <a href="#" onClick={() => { setActiveContent('view-profile'); setIsProfileDropdownOpen(false); }} className="dropdown-item">View Profile</a>
              <a href="#" onClick={() => { setActiveContent('update-profile'); setIsProfileDropdownOpen(false); }} className="dropdown-item">Update Profile</a>
              <button onClick={handleLogout} className="dropdown-item logout-button">Logout</button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Dashboard Layout - Conditional classes */}
      <div className={`dashboard-layout ${hideSidebar ? 'no-sidebar-layout' : ''}`}>
        {/* Left Sidebar - Conditionally rendered */}
        {!hideSidebar && (
          <aside className="sidebar">
            <ul className="sidebar-nav">
              <li className="sidebar-item">
                <button onClick={() => setActiveContent('overview')} className={activeContent === 'overview' ? 'sidebar-button active' : 'sidebar-button'}>Home</button>
              </li>
              {/* Add other teacher-specific sidebar buttons here */}
              <li className="sidebar-item">
                <button onClick={() => setActiveContent('classes')} className={activeContent === 'classes' ? 'sidebar-button active' : 'sidebar-button'}>Classes</button>
              </li>
              <li className="sidebar-item">
                <button onClick={() => setActiveContent('marks')} className={activeContent === 'marks' ? 'sidebar-button active' : 'sidebar-button'}>Marks</button>
              </li>
              <li className="sidebar-item">
                <button onClick={() => setActiveContent('assignments')} className={activeContent === 'assignments' ? 'sidebar-button active' : 'sidebar-button'}>Assignments</button>
              </li>
              <li className="sidebar-item">
                <button onClick={() => setActiveContent('feedback')} className={activeContent === 'feedback' ? 'sidebar-button active' : 'sidebar-button'}>Feedback</button>
              </li>
            </ul>
          </aside>
        )}

        {/* Dynamic Content Area */}
        <main className={`dashboard-main-content ${hideSidebar ? 'full-width-content' : ''}`}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default TeacherDashboard;
