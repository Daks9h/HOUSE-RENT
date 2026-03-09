import React, { useState, useEffect } from 'react';
import { adminGetUsers, adminUpdateUserGrant } from '../../services/api';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await adminGetUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleGrantToggle = async (userId) => {
    try {
      const { data } = await adminUpdateUserGrant(userId);
      // Update local state to reflect the change immediately
      setUsers(users.map(u => u._id === userId ? { ...u, isGranted: data.isGranted } : u));
    } catch (error) {
      alert("Failed to update grant status");
      console.error(error);
    }
  };

  if (loading) return <div>Loading Users...</div>;

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Granted (Owners Only)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className="role-badge">{user.type}</span>
              </td>
              <td>
                {user.type === 'Owner' ? (
                  <span className={user.isGranted ? 'status-granted' : 'status-not-granted'}>
                    {user.isGranted ? 'granted' : 'not granted'}
                  </span>
                ) : null}
              </td>
              <td>
                {user.type === 'Owner' && (
                  <button 
                    className={user.isGranted ? 'action-btn-ungrant' : 'action-btn-grant'}
                    onClick={() => handleGrantToggle(user._id)}
                  >
                    {user.isGranted ? 'Ungrant' : 'Grant'}
                  </button>
                )}
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="6" style={{textAlign: 'center', padding: '30px'}}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
