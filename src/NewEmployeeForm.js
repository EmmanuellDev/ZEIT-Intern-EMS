import React, { useState } from 'react';
import './NewEmployeeForm.css';

const NewEmployeeForm = ({ onAddEmployee }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        jobId: '',
        jobRole: '',
        phoneNumber: '',
        address: '',
        photo: null,
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddEmployee(formData);
        setFormData({
            name: '',
            email: '',
            password: '',
            jobId: '',
            jobRole: '',
            phoneNumber: '',
            address: '',
            photo: null,
        });
    };

    return (
        <div className="form-container">
            <h2>Add New Employee</h2>
            <form onSubmit={handleSubmit} className="employee-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="jobId">Job ID:</label>
                    <input
                        type="text"
                        id="jobId"
                        name="jobId"
                        value={formData.jobId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="jobRole">Job Role:</label>
                    <input
                        type="text"
                        id="jobRole"
                        name="jobRole"
                        value={formData.jobRole}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="photo">Photo:</label>
                    <input
                        type="file"
                        id="photo"
                        name="photo"
                        accept="image/jpeg, image/png"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="submit-button">Add Employee</button>
            </form>
        </div>
    );
};

export default NewEmployeeForm;
