import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "employees"), (snapshot) => {
            const employeesList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setEmployees(employeesList);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
        if (confirmDelete) {
            try {
                await deleteDoc(doc(db, "employees", id));
                toast.success("Employee deleted successfully");
                if (selectedEmployee && selectedEmployee.id === id) {
                    setSelectedEmployee(null);
                }
            } catch (error) {
                console.error("Error deleting employee: ", error);
                toast.error("Error deleting employee");
            }
        }
    };

    const handleEmployeeClick = (employee) => {
        if (selectedEmployee && selectedEmployee.id === employee.id) {
            setSelectedEmployee(null);
        } else {
            setSelectedEmployee(employee);
        }
    };

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-dashboard-container">
            <div className="header-container">
                <h1>Welcome Admin!</h1>
                <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
            </div>
            <div className="button-container">
                <Link to="/add-employee">
                    <button className="action-button">Add New Employee</button>
                </Link>
                <Link to="/applicants" state={{ fromAdminDashboard: true }}>
                    <button className="action-button">Update Applicants</button>
                </Link>
            </div>
            <h2>List of Employees</h2>
            <div className="employee-list">
                {filteredEmployees.map(employee => (
                    <button
                        key={employee.id}
                        className="employee-name-button"
                        onClick={() => handleEmployeeClick(employee)}
                    >
                        {employee.name}
                    </button>
                ))}
            </div>
            {selectedEmployee && (
                <div className="employee-details">
                    <h3>Employee Details</h3>
                    <table className="employee-table">
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>{selectedEmployee.name}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{selectedEmployee.email}</td>
                            </tr>
                            <tr>
                                <td>Job ID:</td>
                                <td>{selectedEmployee.jobId}</td>
                            </tr>
                            <tr>
                                <td>Job Role:</td>
                                <td>{selectedEmployee.jobRole}</td>
                            </tr>
                            <tr>
                                <td>Phone Number:</td>
                                <td>{selectedEmployee.phoneNumber}</td>
                            </tr>
                            <tr>
                                <td>Address:</td>
                                <td>{selectedEmployee.address}</td>
                            </tr>
                            <tr>
                                <td>Photo:</td>
                                <td>
                                    {selectedEmployee.photo && <img src={selectedEmployee.photo} alt="Employee" className="employee-photo" />}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="employee-actions">
                        <Link to={`/edit-employee/${selectedEmployee.id}`}>
                            <button className="edit-button">Update</button>
                        </Link>
                        <button
                            className="delete-button"
                            onClick={() => handleDelete(selectedEmployee.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
            <div className="new-job-section">
                <p>New Jobs Available❔, Post it here</p>
                <Link to="/post-job">
                    <button className="new-job-button">Click here ➡️</button>
                </Link>
                <Link to="/admin-login">
                    <button className="new-job-button-one">Back</button>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
