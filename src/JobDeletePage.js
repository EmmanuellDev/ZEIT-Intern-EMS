import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './JobDeletePage.css';

const JobDeletePage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [deleteStatus, setDeleteStatus] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'jobs'));
        const jobList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setJobs(jobList);
      } catch (e) {
        console.error('Error fetching jobs: ', e);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'jobs', selectedJob));
      setDeleteStatus('Job deleted successfully!');
      setSelectedJob('');
      // Refresh job list
      const updatedJobs = jobs.filter(job => job.id !== selectedJob);
      setJobs(updatedJobs);
    } catch (e) {
      console.error('Error deleting job: ', e);
      setDeleteStatus('Error deleting job, please try again.');
    }
  };

  return (
    <div className="job-delete-container">
      <h1>DELETE A JOB POST</h1>
      <div className="form-group">
        <label htmlFor="jobSelect">Select Job to Delete</label>
        <select
          id="jobSelect"
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
        >
          <option value="" disabled>Select a job</option>
          {jobs.map(job => (
            <option key={job.id} value={job.id}>
              {job.jobName} - {job.jobLocation}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleDelete}>Delete Job</button>
      {deleteStatus && <p className="status-message">{deleteStatus}</p>}
    </div>
  );
};

export default JobDeletePage;
