import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase'; // Import Firestore
import { collection, addDoc } from 'firebase/firestore';
import './ContactPage.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        job: '' // Changed 'address' to 'job'
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Add form data to Firestore under the "applications" collection
            const docRef = await addDoc(collection(db, 'applications'), formData);
            console.log("Document written with ID: ", docRef.id);
            alert('Message sent!');
            // Optionally reset the form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                contactNumber: '',
                job: '' // Reset 'job'
            });
        } catch (e) {
            console.error("Error adding document: ", e);
            alert('Failed to send message. Please try again.');
        }
    };

    const handleClickHere = () => {
        navigate('/applicants', { state: { fromAdminDashboard: false } });
    };

    return (
        <div className="contact-page-container">
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contactNumber">Contact Number:</label>
                    <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="job">Job you want to apply:</label>
                    <textarea
                        id="job"
                        name="job"
                        value={formData.job}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submit-button">Send Message</button>
            </form>
            <div className="additional-text">
                <p>Want to see your competitors & the current status of your Application❔</p>
                <button onClick={handleClickHere} className="click-here-button">
                    Click here ➡️
                </button>
            </div>
        </div>
    );
};

export default ContactPage;
