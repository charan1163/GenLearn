import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import StudentDashboard from './components/StudentDashboard.jsx';
import TeacherDashboard from './components/TeacherDashboard.jsx';
import StudentProfileView from './components/StudentProfileView.jsx';
import TeacherProfileView from './components/TeacherProfileView.jsx';
import UpdateProfileForm from './components/UpdateProfileForm.jsx';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Login Page - Default route */}
        <Route path="/" element={<Login />} />

        {/* Dashboards */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />

        {/* Profile Views */}
        <Route path="/student-profile" element={<StudentProfileView />} />
        <Route path="/teacher-profile" element={<TeacherProfileView />} />

        {/* Update Profile Forms */}
        <Route path="/student-profile-update" element={<UpdateProfileForm userType="student" />} />
        <Route path="/teacher-profile-update" element={<UpdateProfileForm userType="teacher" />} />

        {/* Optional: Add a 404 Not Found page */}
        {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
      </Routes>
    </HashRouter>
  );
}

export default App; 