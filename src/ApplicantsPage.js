import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ApplicantsPage.css';

const ApplicantsPage = () => {
    const [applicants, setApplicants] = useState([]);
    const [selectedApplicantId, setSelectedApplicantId] = useState(null);
    const [status, setStatus] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const isFromAdminDashboard = location.state?.fromAdminDashboard || false;
        setIsAdmin(isFromAdminDashboard);

        const fetchApplicants = async () => {
            const querySnapshot = await getDocs(collection(db, 'applications'));
            const applicantsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setApplicants(applicantsData);
        };

        fetchApplicants();
    }, [location.state]);

    const handleApplicantClick = (applicantId, currentStatus) => {
        if (selectedApplicantId === applicantId) {
            setSelectedApplicantId(null); // Close the details if the same applicant is clicked again
        } else {
            setSelectedApplicantId(applicantId); // Open the details for the selected applicant
            setStatus(currentStatus || 'in-progress');
        }
    };

    const handleStatusChange = async (applicantId) => {
        try {
            const applicantDoc = doc(db, 'applications', applicantId);
            await updateDoc(applicantDoc, { status });
            setApplicants(applicants.map(applicant => 
                applicant.id === applicantId ? { ...applicant, status } : applicant
            ));
            toast.success("Status Updated Successfully");
        } catch (error) {
            console.error("Error updating status: ", error);
            toast.error("Error updating status");
        }
    };

    return (
        <div className="applicants-page-container">
            <ToastContainer />
            <div className="arrow-button" onClick={() => navigate('/')}>
                &#8592;
            </div>
            <div className="content-wrapper">
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
                                        <th>Status</th>
                                        <td>
                                            {isAdmin ? (
                                                <div className="status-edit-container">
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
                                                <span>{status}</span>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default ApplicantsPage;
