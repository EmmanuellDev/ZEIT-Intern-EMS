import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeLogin.css';
import { db } from './firebase';
import { collection, getDocs } from "firebase/firestore";

const EmployeeLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const querySnapshot = await getDocs(collection(db, "employees"));
            const employees = querySnapshot.docs.map(doc => doc.data());

            const employee = employees.find(emp => emp.email === email && emp.password === password);

            if (employee) {
                localStorage.setItem('loggedInEmployeeEmail', email); // Store email
                navigate('/employee-dashboard'); // Redirect to Employee Dashboard
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('Error fetching employee data');
        }
    };

    const handleBack = () => {
        navigate('/'); // Navigate to homepage
    };

    return (
        <div className="page-container">
            <button className="back-button" onClick={handleBack}>⬅️</button>
            <div className="employee-login-container">
                <h1>Employee Login</h1>
                <form onSubmit={handleSubmit} className="employee-login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="submit-button">Login</button>
                </form>
            </div>
            <div className="quote-container">
                <div className="quote-text">
                    "A dream doesn’t become reality through magic; it takes sweat, determination and hard work."
                </div>
                <div className="quote-author">
                    - Colin Powell
                </div>
            </div>
        </div>
    );
};

export default EmployeeLogin;
