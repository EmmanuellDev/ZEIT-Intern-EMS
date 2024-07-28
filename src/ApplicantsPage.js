import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import './ApplicantsPage.css';

const ApplicantsPage = ({ isAdmin }) => {
    const [applicants, setApplicants] = useState([]);
    const [selectedApplicantId, setSelectedApplicantId] = useState(null);
    const [status, setStatus] = useState('');
    const [editingStatusId, setEditingStatusId] = useState(null);

    useEffect(() => {
        const fetchApplicants = async () => {
            const querySnapshot = await getDocs(collection(db, 'applications'));
            const applicantsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setApplicants(applicantsData);
        };

        fetchApplicants();
    }, []);

    const handleApplicantClick = (applicantId, currentStatus) => {
        if (selectedApplicantId === applicantId) {
            setSelectedApplicantId(null); // Close the details if the same applicant is clicked again
        } else {
            setSelectedApplicantId(applicantId); // Open the details for the selected applicant
            setStatus(currentStatus || 'in-progress');
        }
    };

    const handleStatusChange = async (applicantId) => {
        const applicantDoc = doc(db, 'applications', applicantId);
        await updateDoc(applicantDoc, { status });
        setApplicants(applicants.map(applicant => 
            applicant.id === applicantId ? { ...applicant, status } : applicant
        ));
        setEditingStatusId(null); // Exit edit mode
    };

    return (
        <div className="applicants-page-container">
            <h1>Applicants</h1>
            <div className="applicants-list">
                {applicants.map((applicant) => (
                    <button
                        key={applicant.id}
                        className="applicant-name-button"
                        onClick={() => handleApplicantClick(applicant.id, applicant.status)}
                    >
                        {applicant.firstName}
                    </button>
                ))}
            </div>
            {applicants.map((applicant) => (
                selectedApplicantId === applicant.id && (
                    <div key={applicant.id} className="applicant-details">
                        <table>
                            <tbody>
                                <tr>
                                    <th>First Name</th>
                                    <td>{applicant.firstName}</td>
                                </tr>
                                <tr>
                                    <th>Last Name</th>
                                    <td>{applicant.lastName}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{applicant.email}</td>
                                </tr>
                                <tr>
                                    <th>Contact Number</th>
                                    <td>{applicant.contactNumber}</td>
                                </tr>
                                <tr>
                                    <th>Job</th>
                                    <td>{applicant.job}</td>
                                </tr>
                                <tr>
                                    <th>Resume</th>
                                    <td>
                                        <a href={applicant.resume} target="_blank" rel="noopener noreferrer">
                                            View Resume
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>
                                        {isAdmin ? (
                                            editingStatusId === applicant.id ? (
                                                <div>
                                                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                                        <option value="in-progress">In-progress</option>
                                                        <option value="accepted">Accepted</option>
                                                        <option value="rejected">Rejected</option>
                                                    </select>
                                                    <button onClick={() => handleStatusChange(applicant.id)}>
                                                        Update Status
                                                    </button>
                                                </div>
                                            ) : (
                                                <div>
                                                    {applicant.status || 'in-progress'}
                                                    <button onClick={() => setEditingStatusId(applicant.id)}>
                                                        Edit
                                                    </button>
                                                </div>
                                            )
                                        ) : (
                                            applicant.status || 'in-progress'
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            ))}
        </div>
    );
};

export default ApplicantsPage;
