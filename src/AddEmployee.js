import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
            <div className="header-container">
                <h1>Add New Employee</h1>
                <Link to="/admin-dashboard" className="back-arrow-button">
                &#8592;
                </Link>
            </div>
            <form onSubmit={handleSubmit} className="employee-form">
                <div className="table-container">
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td><input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                /></td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td><input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                /></td>
                            </tr>
                            <tr>
                                <th>Password</th>
                                <td><input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                /></td>
                            </tr>
                            <tr>
                                <th>Job ID</th>
                                <td><input
                                    type="text"
                                    id="jobId"
                                    value={jobId}
                                    onChange={(e) => setJobId(e.target.value)}
                                    required
                                /></td>
                            </tr>
                            <tr>
                                <th>Job Role</th>
                                <td><input
                                    type="text"
                                    id="jobRole"
                                    value={jobRole}
                                    onChange={(e) => setJobRole(e.target.value)}
                                    required
                                /></td>
                            </tr>
                            <tr>
                                <th>Phone Number</th>
                                <td><input
                                    type="text"
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                /></td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td><input
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                /></td>
                            </tr>
                            <tr>
                                <th>Photo</th>
                                <td><input
                                    type="file"
                                    id="photo"
                                    onChange={handlePhotoChange}
                                /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button type="submit" className="submit-button">Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;
