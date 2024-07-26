import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Dashboard = ({ user }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    job_id: '',
    role: '',
    contact: '',
    address: ''
  });
  const [message, setMessage] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    setAllUsers(users);
    setFilteredUsers(users);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === newUser.email);
    if (userExists) {
      setMessage('User with this email already exists.');
    } else {
      users.push({ ...newUser });
      localStorage.setItem('users', JSON.stringify(users));
      setAllUsers(users);
      setFilteredUsers(users);
      setMessage('User added successfully!');
      setNewUser({
        name: '',
        email: '',
        password: '',
        job_id: '',
        role: '',
        contact: '',
        address: ''
      });
    }
  };

  const handleDeleteUser = (email) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.filter(user => user.email !== email);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setAllUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setMessage('User deleted successfully!');
  };

  const handleEditClick = (user) => {
    setEditUser(user);
    setNewUser({ ...user });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u => u.email === newUser.email ? { ...u, ...newUser } : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setAllUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setMessage('User updated successfully!');
    setNewUser({
      name: '',
      email: '',
      password: '',
      job_id: '',
      role: '',
      contact: '',
      address: ''
    });
    setEditUser(null);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = allUsers.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  const handleAddJobClick = () => {
    navigate('/job-postings'); // Navigate to the Job Postings page
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {user.email === 'c.management@gmail.com' && (
        <>
          <p>Welcome, {user.username}!</p>
          <p>Email: {user.email}</p>
        </>
      )}

      {user.email !== 'c.management@gmail.com' && (
        <>
          <p>Welcome, {user.name}!</p>
          <p>Job ID: {user.job_id}</p>
        </>
      )}

      {user.email === 'c.management@gmail.com' && (
        <div>
          <h3>{editUser ? 'Update User' : 'Add New User'}</h3>
          <form onSubmit={editUser ? handleUpdateUser : handleAddUser}>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={newUser.name} onChange={handleChange} required />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={newUser.email} onChange={handleChange} required />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" value={newUser.password} onChange={handleChange} required />
            </div>
            <div>
              <label>Job ID:</label>
              <input type="text" name="job_id" value={newUser.job_id} onChange={handleChange} required />
            </div>
            <div>
              <label>Role:</label>
              <input type="text" name="role" value={newUser.role} onChange={handleChange} required />
            </div>
            <div>
              <label>Contact:</label>
              <input type="text" name="contact" value={newUser.contact} onChange={handleChange} required />
            </div>
            <div>
              <label>Address:</label>
              <input type="text" name="address" value={newUser.address} onChange={handleChange} required />
            </div>
            <button type="submit">{editUser ? 'Update User' : 'Add User'}</button>
          </form>
          {message && <p>{message}</p>}

          <h3>All Users</h3>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search by name or role..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ marginRight: '8px' }}
            />
            <FontAwesomeIcon icon={faSearch} />
          </div>

          <table border="1">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Job ID</th>
                <th>Role</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="7">No user details exist.</td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.job_id}</td>
                    <td>{user.role}</td>
                    <td>{user.contact}</td>
                    <td>{user.address}</td>
                    <td>
                      {user.email !== 'c.management@gmail.com' && (
                        <>
                          <button onClick={() => handleEditClick(user)}>Update</button>
                          <button onClick={() => handleDeleteUser(user.email)}>Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          
          {/* Add New Job Button */}
          <button onClick={handleAddJobClick} style={{ marginTop: '20px' }}>Add New Job</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
