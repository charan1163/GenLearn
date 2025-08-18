import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UpdateProfileForm.css';

const UpdateProfileForm = ({ userType }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Get the appropriate ID from localStorage
    const userId = userType === 'student' 
        ? localStorage.getItem('loggedInRollNumber')
        : localStorage.getItem('loggedInFacultyId');

    React.useEffect(() => {
        const fetchProfile = async () => {
            if (!userId) return;
            
            try {
                const endpoint = userType === 'student' 
                    ? `http://localhost:5000/api/student/profile/${userId}`
                    : `http://localhost:5000/api/teacher/profile/${userId}`;
                
                const response = await axios.get(endpoint);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setMessage({ type: 'error', text: 'Failed to load profile data' });
            }
        };

        fetchProfile();
    }, [userId, userType]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });
        
        try {
            const endpoint = userType === 'student' 
                ? `http://localhost:5000/api/student/profile/${userId}`
                : `http://localhost:5000/api/teacher/profile/${userId}`;
            
            await axios.put(endpoint, formData);
            
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            
            // Redirect back to dashboard after a short delay
            setTimeout(() => {
                navigate(userType === 'student' ? '/student-dashboard' : '/teacher-dashboard');
            }, 2000);
            
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage({ 
                type: 'error', 
                text: error.response?.data?.message || 'Failed to update profile' 
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate(userType === 'student' ? '/student-dashboard' : '/teacher-dashboard');
    };

    const renderStudentFields = () => (
        <>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="semester">Semester</label>
                <input
                    type="text"
                    id="semester"
                    name="semester"
                    value={formData.semester || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="linkedin">LinkedIn Profile</label>
                <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="github">GitHub Profile</label>
                <input
                    type="url"
                    id="github"
                    name="github"
                    value={formData.github || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="portfolio">Portfolio Website</label>
                <input
                    type="url"
                    id="portfolio"
                    name="portfolio"
                    value={formData.portfolio || ''}
                    onChange={handleChange}
                />
            </div>
        </>
    );

    const renderTeacherFields = () => (
        <>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="role">Role</label>
                <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="level">Level</label>
                <input
                    type="text"
                    id="level"
                    name="level"
                    value={formData.level || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="collegeOfGraduation">College of Graduation</label>
                <input
                    type="text"
                    id="collegeOfGraduation"
                    name="collegeOfGraduation"
                    value={formData.collegeOfGraduation || ''}
                    onChange={handleChange}
                />
            </div>
        </>
    );

    if (!userId) {
        return (
            <div className="update-profile-form">
                <h2>Error</h2>
                <p>No user ID found. Please log in again.</p>
                <button onClick={() => navigate('/')} className="btn-cancel">
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="update-profile-form">
            <h2>Update {userType === 'student' ? 'Student' : 'Teacher'} Profile</h2>
            
            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                {userType === 'student' ? renderStudentFields() : renderTeacherFields()}
                
                <div className="form-actions">
                    <button 
                        type="submit" 
                        className="btn-save"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button 
                        type="button" 
                        className="btn-cancel" 
                        onClick={handleCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfileForm;

            );
            onProfileUpdate(res.data); // Update the parent component's state
        } catch (error) {
            console.error('Error updating profile:', error.response ? error.response.data : error.message);
            // Optionally, show an error message to the user
        }
    };

    return (
        <div className="update-profile-form">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <input
                        type="text"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contactNumber">Contact Number</label>
                    <input
                        type="text"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-save">Save Changes</button>
                    <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfileForm;