import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './navbar';
import UserProfile from './userprofile';
import AdminPanel from './admin page'; // Import the AdminPanel component
import users from './userdata';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [dataList, setDataList] = useState([]); 

  const filteredUsers = users.filter(user =>
    user.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSummaryClick = (user) => {
    setSelectedUser(user);
  };

  const handleDataListChange = (newDataList) => {
    setDataList(newDataList);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search by city or name"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-bar"
          />
          <button className="search-button">Search</button>
        </div>

        <div className="users-container">
          <Routes>
            <Route path="/" element={<Home filteredUsers={filteredUsers} handleSummaryClick={handleSummaryClick} selectedUser={selectedUser} />} />
            <Route path="/admin" element={<AdminPanel dataList={dataList} onDataListChange={handleDataListChange} />} /> {/* Pass dataList and onDataListChange to AdminPanel */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home({ filteredUsers, handleSummaryClick, selectedUser }) {
  return (
    <>
      {filteredUsers.map(user => (
        <div key={user.name} className="profile">
          <div className="profile-photo">
            <img src={user.photoUrl} alt={user.name} />
          </div>
          <div className="profile-info">
            <address>
              <b>
                <p>Name: {user.name}</p>
                <p>Address: {user.address}</p>
              </b>
            </address>
            <button onClick={() => handleSummaryClick(user)}>Summary</button>
          </div>
          {selectedUser && selectedUser.name === user.name && <UserProfile user={selectedUser} />}
        </div>
      ))}
    </>
  );
}

export default App;
