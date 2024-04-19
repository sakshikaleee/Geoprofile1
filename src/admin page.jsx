import React, { useState } from 'react';
import users from './userdata'; // Import users from the userData file
import './AdminPanel.css'; // Import CSS file for styling

function AdminPanel({ dataList, onDataListChange }) {
  const [formData, setFormData] = useState({ name: '', address: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onDataListChange([...dataList, formData]); // Update dataList using onDataListChange
    setFormData({ name: '', address: '' });
  };

  const handleDelete = (index) => {
    const newDataList = [...dataList];
    newDataList.splice(index, 1);
    onDataListChange(newDataList); // Update dataList using onDataListChange
  };

  // Function to handle editing a user
  const handleEdit = (index) => {
    const editedUser = dataList[index];
    setFormData({ ...editedUser });
    handleDelete(index);
  };

  return (
    <div className="admin-panel">
      <h1 className="admin-panel-title">Admin Panel</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <label className="form-label">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>
        <label className="form-label">
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>
        <button type="submit" className="form-button">Add</button>
      </form>
      <div className="user-list">
        <h2 className="user-list-title">Existing Users</h2>
        <ul className="user-list-container">
          {users.map((user, index) => (
            <li key={index} className="user-list-item">
              <div className="user-info">
                <span>{user.name}</span> - <span>{user.address}</span>
              </div>
              <div className="user-buttons">
                <button onClick={() => handleDelete(index)} className="user-delete-button">Delete</button>
                <button onClick={() => handleEdit(index)} className="user-edit-button">Edit</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="user-list">
        <h2 className="user-list-title">Added Users</h2>
        <ul className="user-list-container">
          {dataList.map((data, index) => (
            <li key={index} className="user-list-item">
              <div className="user-info">
                <span>{data.name}</span> - <span>{data.address}</span>
              </div>
              <div className="user-buttons">
                <button onClick={() => handleDelete(index)} className="user-delete-button">Delete</button>
                <button onClick={() => handleEdit(index)} className="user-edit-button">Edit</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminPanel;