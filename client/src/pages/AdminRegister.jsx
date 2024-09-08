import React from 'react';
import Register from '../components/Register';

const AdminRegister = ({handleAlert, user}) => {
  return (
    <>
      <Register role="admin" handleAlert={handleAlert} user={user} />
    </>
  );
}

export default AdminRegister;
