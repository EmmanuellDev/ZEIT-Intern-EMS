import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './JobPostingPage.css';

const JobPostingPage = () => {
  const [jobName, setJobName] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobSalary, setJobSalary] = useState('');
  const [jobVacancies, setJobVacancies] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'jobs'), {
        jobName,
        jobLocation,
        jobDescription,
        jobSalary,
        jobVacancies,
      });
      console.log('Document written with ID: ', docRef.id);
      setJobName('');
      setJobLocation('');
      setJobDescription('');
      setJobSalary('');
      setJobVacancies('');
      alert('Job posted successfully!');
    } catch (e) {
      console.error('Error adding document: ', e);
      alert('Error posting job, please try again.');
    }
  };

  const handleGoClick = () => {
    navigate('/job-delete');
  };

  return (
    <div className="page-wrapper">
      <div className="arrow-button" onClick={() => navigate('/admin-dashboard')}>
        &larr;
      </div>
      <div className="job-posting-container">
        <h1>POST A NEW JOB</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="jobName">Name of the Job</label>
            <input
              type="text"
              id="jobName"
              name="jobName"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobLocation">Location of the Job</label>
            <input
              type="text"
              id="jobLocation"
              name="jobLocation"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobDescription">Job Description</label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobSalary">Job Salary</label>
            <input
              type="text"
              id="jobSalary"
              name="jobSalary"
              value={jobSalary}
              onChange={(e) => setJobSalary(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobVacancies">Number of Job Vacancies</label>
            <input
              type="number"
              id="jobVacancies"
              name="jobVacancies"
              value={jobVacancies}
              onChange={(e) => setJobVacancies(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="extra-section">
        <p>Want to delete a Job Post❔</p>
        <button className="delete-button" onClick={handleGoClick}>Go ➡️</button>
      </div>
    </div>
  );
};

export default JobPostingPage;

