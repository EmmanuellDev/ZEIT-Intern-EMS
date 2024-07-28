import React from 'react';
import { useHistory } from 'react-router-dom';

const LoginOptions = () => {
    const history = useHistory();

    const handleAdminLogin = () => {
        history.push('/admin-dashboard');
    };

    const handleEmployeeLogin = () => {
        history.push('/employee-dashboard');
    };

    const handleClose = () => {
        // Depending on your setup, you might want to handle closing the app or redirecting to a different page
        // For example:
        // window.close();
        // Or redirect to a welcome page
        history.push('/welcome');
    };

    return (
        <div>
            <h1>Login Options</h1>
            <button onClick={handleAdminLogin}>Admin Login</button>
            <button onClick={handleEmployeeLogin}>Employee Login</button>
            <button onClick={handleClose}>Close</button>
        </div>
    );
};

export default LoginOptionsModal;
