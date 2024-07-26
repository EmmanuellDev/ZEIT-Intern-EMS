// src/App.js
// Dependencies
   // npm install react-router-dom
   // npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
   // npm install react-google-recaptcha


   import React from 'react';
   import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
   import Dashboard from './components/Dashboard';
   import AdminLogin from './components/AdminLogin';
   import EmployeeLogin from './components/EmployeeLogin';
   import Home from './components/Home';
   import JobPostings from './components/JobPostings'; // Import the new component
   
   function App() {
     const [loggedInUser, setLoggedInUser] = React.useState(null);
   
     return (
       <Router>
         <div>
           <nav>
             <Link to="/">Home</Link>
           </nav>
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/admin-login" element={<AdminLogin onLogin={setLoggedInUser} />} />
             <Route path="/employee-login" element={<EmployeeLogin onLogin={setLoggedInUser} />} />
             <Route path="/dashboard" element={<Dashboard user={loggedInUser} />} />
             <Route path="/job-postings" element={<JobPostings />} /> {/* Add the new route */}
           </Routes>
         </div>
       </Router>
     );
   }
   
   export default App;
   