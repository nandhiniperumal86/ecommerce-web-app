import React from 'react';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user || !user.isAdmin) {
    return <h2 className="text-center mt-5">Access Denied</h2>;
  }

  return (
    <div className="container mt-5">
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.name}! You can manage products here.</p>
    </div>
  );
};

export default AdminDashboard;
