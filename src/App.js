// App.js


// Dependencies
// npm install react-router-dom@latest
// npm install firebase
// npm install react-toastify

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AdminLoginPage from './AdminLoginPage';
import EmployeeLogin from './EmployeeLogin';
import AdminDashboard from './AdminDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import AddEmployee from './AddEmployee';
import ContactPage from './ContactPage';
import EditEmployee from './EditEmployee';
import ApplicantsPage from './ApplicantsPage';
import JobPostingPage from './JobPostingPage';
import JobDeletePage from './JobDeletePage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin-login" element={<AdminLoginPage />} />
                <Route path="/employee-login" element={<EmployeeLogin />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                <Route path="/edit-employee/:id" element={<EditEmployee />} />
                <Route path="/add-employee" element={<AddEmployee />} />
                <Route path="/contact-page" element={<ContactPage />} />
                <Route path="/applicants" element={<ApplicantsPage />} />
                <Route path="/post-job" element={<JobPostingPage />} />
                <Route path="/job-delete" element={<JobDeletePage />} />
            </Routes>
        </Router>
    );
};

export default App;

