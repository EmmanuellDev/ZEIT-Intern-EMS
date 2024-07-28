// src/EditEmployee.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import './EditEmployee.css';

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        password: '',
        jobId: '',
        jobRole: '',
        phoneNumber: '',
        address: '',
        photo: ''
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            const docRef = doc(db, "employees", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setEmployee(docSnap.data());
            } else {
                console.log("No such document!");
            }
        };
        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({
            ...employee,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, "employees", id);
            await updateDoc(docRef, employee);
            alert('Employee updated successfully');
            navigate('/admin-dashboard');
        } catch (error) {
            console.error("Error updating employee: ", error);
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setEmployee({
                ...employee,
                photo: reader.result
            });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="edit-employee-container">
            <h1>Edit Employee</h1>
            <form onSubmit={handleSubmit} className="employee-form">
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="name">Name:</label></td>
                            <td><input
                                type="text"
                                id="name"
                                name="name"
                                value={employee.name}
                                onChange={handleChange}
                                required
                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="email">Email:</label></td>
                            <td><input
                                type="email"
                                id="email"
                                name="email"
                                value={employee.email}
                                onChange={handleChange}
                                required
                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="password">Password:</label></td>
                            <td><input
                                type="password"
                                id="password"
                                name="password"
                                value={employee.password}
                                onChange={handleChange}
                                required
                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="jobId">Job ID:</label></td>
                            <td><input
                                type="text"
                                id="jobId"
                                name="jobId"
                                value={employee.jobId}
                                onChange={handleChange}
                                required
                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="jobRole">Job Role:</label></td>
                            <td><input
                                type="text"
                                id="jobRole"
                                name="jobRole"
                                value={employee.jobRole}
                                onChange={handleChange}
                                required
                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="phoneNumber">Phone Number:</label></td>
                            <td><input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={employee.phoneNumber}
                                onChange={handleChange}
                                required
                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="address">Address:</label></td>
                            <td><input
                                type="text"
                                id="address"
                                name="address"
                                value={employee.address}
                                onChange={handleChange}
                                required
                            /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="photo">Photo:</label></td>
                            <td><input
                                type="file"
                                id="photo"
                                name="photo"
                                onChange={handlePhotoChange}
                            /></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" className="submit-button">Update Employee</button>
            </form>
        </div>
    );
};

export default EditEmployee;
