import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './ContactPage.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        job: '',
        resume: null
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Upload resume file to Firebase Storage
            const storageRef = ref(storage, `resumes/${formData.resume.name}`);
            await uploadBytes(storageRef, formData.resume);
            const resumeURL = await getDownloadURL(storageRef);

            // Save application data to Firestore with status "in-progress"
            await addDoc(collection(db, 'applications'), {
                ...formData,
                resume: resumeURL,
                status: 'in-progress'
            });

            alert('Application submitted successfully!');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                contactNumber: '',
                job: '',
                resume: null
            });

            navigate('/applicants'); // Redirect to applicants page after submission
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Error submitting application. Please try again.');
        }
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
                    <label htmlFor="job">Job you are going to apply:</label>
                    <textarea
                        id="job"
                        name="job"
                        value={formData.job}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="resume">Resume (PDF only):</label>
                    <input
                        type="file"
                        id="resume"
                        name="resume"
                        accept=".pdf"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Send Message</button>
            </form>
            <div className="additional-text">
                <p>Want to see your competitors & the current status of your Application❔</p>
                <button onClick={() => navigate('/applicants', { state: { fromAdminDashboard: false } })} className="click-here-button">
    Click here ➡️
</button>

            </div>
        </div>
    );
};

export default ContactPage;
