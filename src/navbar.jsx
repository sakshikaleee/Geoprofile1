import React from 'react';
import { Link } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';

function Navbar() {
  return (
    <div className="navbar">
      <div className="app-name">
        <Link to="/">GeoProfile</Link>
      </div>
      <div className="admin-button">
        <Link to="/admin">
          <MdDashboard /> Admin
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
