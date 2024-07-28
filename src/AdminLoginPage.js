import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLoginPage.css';

const AdminLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle admin login logic here
        alert('Logged in as Admin!');
        navigate('/admin-dashboard'); // Redirect to admin dashboard on successful login
    };

    return (
        <div className="page-container">
            <div className="admin-login-container">
                <h1>Admin Login</h1>
                <form onSubmit={handleLogin} className="admin-login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
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
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Login</button>
                </form>
            </div>
            <div className="quote-container">
                <div className="quote-text">
                    "Management's job is to convey leadership's message in a compelling and inspiring way. Not just in meetings, but also by example."
                </div>
                <div className="quote-author">
                    - Jeffrey Gitomer
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
