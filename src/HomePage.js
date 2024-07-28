import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import './HomePage.css';

const HomePage = () => {
    const [showLoginOptions, setShowLoginOptions] = useState(false);
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    const handleLoginClick = () => {
        setShowLoginOptions(true);
    };

    const handleAdminLogin = () => {
        navigate('/admin-login');
    };

    const handleEmployeeLogin = () => {
        navigate('/employee-login');
    };

    const handleClose = () => {
        setShowLoginOptions(false);
    };

    const handleApply = () => {
        navigate('/contact-page'); // Redirect to contact page
    };

    useEffect(() => {
        const fetchJobs = async () => {
            const jobsCollection = collection(db, 'jobs');
            const jobsSnapshot = await getDocs(jobsCollection);
            const jobsList = jobsSnapshot.docs.map(doc => doc.data());
            setJobs(jobsList);
        };

        fetchJobs();
    }, []);

    return (
        <div className="home-page-container">
            <div className="login-section">
                <h1>EMPLOYEE MANAGEMENT SYSTEM</h1>
                <h2>ZEIT TECH PVT LTD</h2>
                {!showLoginOptions ? (
                    <button onClick={handleLoginClick} className="button">Login</button>
                ) : (
                    <div className="login-options-container">
                        <div className="login-options-wrapper">
                            <button onClick={handleAdminLogin} className="button">Admin Login</button>
                            <button onClick={handleEmployeeLogin} className="button">Employee Login</button>
                        </div>
                        <button onClick={handleClose} className="button">Close</button>
                    </div>
                )}
            </div>
            <div className="jobs-section">
                <h2>List of Available Jobs</h2>
                <table className="jobs-table">
                    <thead>
                        <tr>
                            <th>Job Name</th>
                            <th>Job Location</th>
                            <th>Job Description</th>
                            <th>Salary</th>
                            <th>Vacancies</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job, index) => (
                            <tr key={index}>
                                <td>{job.jobName}</td>
                                <td>{job.jobLocation}</td>
                                <td>{job.jobDescription}</td>
                                <td>{job.jobSalary}</td>
                                <td>{job.jobVacancies}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="apply-section">
                <h3 className="apply-heading">Searching for a Job ❔</h3>
                <h3 className="apply-heading">Then apply here ⬇️</h3>
                <button onClick={handleApply} className="apply-button">Apply</button>
            </div>
        </div>
    );
};

export default HomePage;
