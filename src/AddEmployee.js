// src/AddEmployee.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import './AddEmployee.css';

const AddEmployee = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [jobId, setJobId] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [photo, setPhoto] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const employeeData = {
            name,
            email,
            password,
            jobId,
            jobRole,
            phoneNumber,
            address,
            photo,
        };

        try {
            await addDoc(collection(db, "employees"), employeeData);
            alert('Employee added successfully');
            navigate('/admin-dashboard');
        } catch (error) {
            console.error("Error adding employee: ", error);
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onloadend = () => {
            setPhoto(reader.result);
        };
        
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="add-employee-container">
            <h1>Add New Employee</h1>
            <form onSubmit={handleSubmit} className="employee-form">
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="name">Name:</label></td>
                            <td><input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="email">Email:</label></td>
                            <td><input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="password">Password:</label></td>
                            <td><input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="jobId">Job ID:</label></td>
                            <td><input
                                type="text"
                                id="jobId"
                                value={jobId}
                                onChange={(e) => setJobId(e.target.value)}
                                required
                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="jobRole">Job Role:</label></td>
                            <td><input
                                type="text"
                                id="jobRole"
                                value={jobRole}
                                onChange={(e) => setJobRole(e.target.value)}
                                required
                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="phoneNumber">Phone Number:</label></td>
                            <td><input
                                type="text"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="address">Address:</label></td>
                            <td><input
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="photo">Photo:</label></td>
                            <td><input
                                type="file"
                                id="photo"
                                onChange={handlePhotoChange}
                            /></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" className="submit-button">Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;
