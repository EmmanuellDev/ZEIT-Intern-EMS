import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            const loggedInEmployeeEmail = localStorage.getItem('loggedInEmployeeEmail');
            if (!loggedInEmployeeEmail) {
                navigate('/employee-login');
                return;
            }

            try {
                const q = query(collection(db, "employees"), where("email", "==", loggedInEmployeeEmail));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const employeeData = querySnapshot.docs[0].data();
                    setEmployee(employeeData);
                } else {
                    console.error('Employee not found');
                }
            } catch (error) {
                console.error('Error fetching employee details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeDetails();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('loggedInEmployeeEmail');
        navigate('/employee-login');
    };

    return (
        <div className="employee-dashboard-container">
            {employee && (
                <div className="welcome-message">
                    Welcome, {employee.name}!
                </div>
            )}
            <h1>Your Dashboard</h1>
            {loading ? (
                <p>Loading employee details...</p>
            ) : employee ? (
                <table className="employee-details-table">
                    <tbody>
                        <tr>
                            <th>Name:</th>
                            <td>{employee.name}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{employee.email}</td>
                        </tr>
                        <tr>
                            <th>Job ID:</th>
                            <td>{employee.jobId}</td>
                        </tr>
                        <tr>
                            <th>Job Role:</th>
                            <td>{employee.jobRole}</td>
                        </tr>
                        <tr>
                            <th>Phone Number:</th>
                            <td>{employee.phoneNumber}</td>
                        </tr>
                        <tr>
                            <th>Address:</th>
                            <td>{employee.address}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>Employee details not found</p>
            )}
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
    );
};

export default EmployeeDashboard;
