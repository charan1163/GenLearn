import React, { useState } from 'react';
import axios from 'axios';
import './UpdateProfileForm.css';

const UpdateProfileForm = ({ profileData, onProfileUpdate, onCancel }) => {
    const [formData, setFormData] = useState({
        name: profileData.name || '',
        department: profileData.department || '',
        contactNumber: profileData.contactNumber || '',
        email: profileData.email || '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/teacher/profile`,
                formData,
                { headers: { 'x-auth-token': token } }
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