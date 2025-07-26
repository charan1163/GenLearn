import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StudentDashboard.css';
import StudentProfileView from './StudentProfileView';
import UpdateProfileForm from './UpdateProfileForm';

// Placeholder Components for Content Sections (no changes here, just for context)
const OverviewNotifications = ({ studentName }) => (
  <div className="content-section overview-notifications">
    <h2>Welcome, {studentName}!</h2>
    <p>Here are your latest overview and notifications.</p>
    <div className="notification-card">
        <h3>Important: Semester Exams</h3>
        <p>Exams start from August 10th. Check timetable.</p>
    </div>
    <div className="notification-card">
        <h3>New Assignment Posted</h3>
        <p>Check your assignments section for "Web Development Project".</p>
    </div>
  </div>
);

const AssignmentsPage = () => (
  <div className="content-section assignments-page">
    <h2>Assignments</h2>
    <p>Here you can view and submit your assignments.</p>
    <div className="assignment-item">Math Assignment 1 - Due: 25th July</div>
    <div className="assignment-item">Physics Lab Report - Due: 28th July</div>
  </div>
);

const AttendancePage = () => (
  <div className="content-section attendance-page">
    <h2>Attendance</h2>
    <p>View your subject-wise attendance records.</p>
    <div className="attendance-summary">Overall Attendance: 85%</div>
  </div>
);

const ResultsPage = () => (
  <div className="content-section results-page">
    <h2>Results</h2>
    <p>Check your internal and semester marks here.</p>
    <div className="marks-summary">Semester 4 GPA: 8.5</div>
  </div>
);

const AnalysisPage = () => (
  <div className="content-section analysis-page">
    <h2>Academic Performance Analysis</h2>
    <p>Visual insights about your scores, attendance, and trends.</p>
    <div className="analysis-chart">Performance Chart Placeholder</div>
  </div>
);

const EventsPage = () => (
  <div className="content-section events-page">
    <h2>College Events & Updates</h2>
    <p>Stay updated with the latest happenings!</p>
    <div className="event-post-list">
      <div className="event-post-card">
        <div className="post-header">
          <img src="https://placehold.co/40x40/007bff/ffffff?text=E" alt="Event Icon" />
          <span className="post-title">Annual Sports Meet</span>
        </div>
        <img src="https://placehold.co/300x200/4a90e2/ffffff?text=Sports+Meet" alt="Sports Meet" className="post-image" />
        <div className="post-content">
          <p>Get ready for the most awaited Annual Sports Meet! 💪 Join us for a day of thrilling competitions and fun. #SportsMeet #CollegeLife</p>
          <div className="post-actions">
            <span>❤️ 120 Likes</span>
            <span>💬 15 Comments</span>
          </div>
        </div>
      </div>
      <div className="event-post-card">
        <div className="post-header">
          <img src="https://placehold.co/40x40/28a745/ffffff?text=W" alt="Webinar Icon" />
          <span className="post-title">Webinar: Future of AI</span>
        </div>
        <img src="https://placehold.co/300x200/28a745/ffffff?text=AI+Webinar" alt="AI Webinar" className="post-image" />
        <div className="post-content">
          <p>Dive deep into the future of Artificial Intelligence with industry experts. Register now! 🤖 #AI #Webinar</p>
          <div className="post-actions">
            <span>❤️ 80 Likes</span>
            <span>💬 8 Comments</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);


function StudentDashboard() {
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [studentProfile, setStudentProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState('');
  const [activeContent, setActiveContent] = useState('overview'); // State to manage active content

  const loggedInRollNumber = localStorage.getItem('loggedInRollNumber');

  useEffect(() => {
    const fetchStudentProfile = async () => {
      if (!loggedInRollNumber) {
        setProfileError('No roll number found. Please log in again.');
        setLoadingProfile(false);
        navigate('/');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/student/profile/${loggedInRollNumber}`);
        setStudentProfile(response.data);
      } catch (error) {
        console.error('Error fetching student profile:', error);
        setProfileError('Failed to load profile. Please try again.');
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchStudentProfile();
  }, [loggedInRollNumber, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInRollNumber');
    console.log('Logging out...');
    navigate('/');
  };

  const renderContent = () => {
    switch (activeContent) {
      case 'overview':
        return <OverviewNotifications studentName={studentProfile?.name || 'Student'} />;
      case 'assignments':
        return <AssignmentsPage />;
      case 'attendance':
        return <AttendancePage />;
      case 'results':
        return <ResultsPage />;
      case 'analysis':
        return <AnalysisPage />;
      case 'events':
        return <EventsPage />;
      case 'view-profile':
        return <StudentProfileView />; // Render the profile view component
      case 'update-profile': // New case for Update Profile Form
        return <UpdateProfileForm userType="student" />;
      default:
        return <OverviewNotifications studentName={studentProfile?.name || 'Student'} />;
    }
  };

  const hideSidebar = activeContent === 'view-profile' || activeContent === 'update-profile'; // Hide sidebar for both profile views

  return (
    <div className="student-dashboard-container">
      {/* Top Navbar */}
      <nav className="navbar top-navbar">
        <div className="navbar-brand-home" onClick={() => setActiveContent('overview')}>
          GenLearn
        </div>
        <div className="navbar-profile">
          <img
            src={studentProfile?.profilePic || 'https://placehold.co/100x100/cccccc/000000?text=P'}
            alt="Profile"
            className="profile-image"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          />
          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <a href="#" onClick={() => { setActiveContent('view-profile'); setIsProfileDropdownOpen(false); }} className="dropdown-item">View Profile</a>
              {/* Updated link to navigate to update form by changing activeContent */}
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
              <li className="sidebar-item">
                <button onClick={() => setActiveContent('assignments')} className={activeContent === 'assignments' ? 'sidebar-button active' : 'sidebar-button'}>Assignments</button>
              </li>
              <li className="sidebar-item">
                <button onClick={() => setActiveContent('attendance')} className={activeContent === 'attendance' ? 'sidebar-button active' : 'sidebar-button'}>Attendance</button>
              </li>
              <li className="sidebar-item">
                <button onClick={() => setActiveContent('results')} className={activeContent === 'results' ? 'sidebar-button active' : 'sidebar-button'}>Results</button>
              </li>
              <li className="sidebar-item">
                <button onClick={() => setActiveContent('analysis')} className={activeContent === 'analysis' ? 'sidebar-button active' : 'sidebar-button'}>Analysis</button>
              </li>
              <li className="sidebar-item">
                <button onClick={() => setActiveContent('events')} className={activeContent === 'events' ? 'sidebar-button active' : 'sidebar-button'}>Events</button>
              </li>
              <li className="sidebar-item">
                <button onClick={() => setActiveContent('option')} className={activeContent === 'option' ? 'sidebar-button active' : 'sidebar-button'}>Option</button>
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

export default StudentDashboard;
