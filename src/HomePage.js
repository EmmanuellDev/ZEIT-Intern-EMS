// HomePage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import './HomePage.css';

const HomePage = () => {
    const [showLoginOptions, setShowLoginOptions] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
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

    const handleJobClick = (job) => {
        setSelectedJob(selectedJob === job ? null : job); // Toggle job details
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
                <div className="jobs-list">
                    {jobs.map((job, index) => (
                        <button
                            key={index}
                            className="job-button"
                            onClick={() => handleJobClick(job)}
                        >
                            {job.jobName}
                        </button>
                    ))}
                </div>
                {selectedJob && (
                    <div className="job-details">
                        <h3>Job Details</h3>
                        <table className="jobs-table">
                            <tbody>
                                <tr>
                                    <th>Job Name</th>
                                    <td>{selectedJob.jobName}</td>
                                </tr>
                                <tr>
                                    <th>Job Location</th>
                                    <td>{selectedJob.jobLocation}</td>
                                </tr>
                                <tr>
                                    <th>Job Description</th>
                                    <td>{selectedJob.jobDescription}</td>
                                </tr>
                                <tr>
                                    <th>Salary</th>
                                    <td>{selectedJob.jobSalary}</td>
                                </tr>
                                <tr>
                                    <th>Vacancies</th>
                                    <td>{selectedJob.jobVacancies}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
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
