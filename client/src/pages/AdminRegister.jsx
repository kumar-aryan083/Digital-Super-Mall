import React from 'react';
import Register from '../components/Register';

const AdminRegister = ({handleAlert}) => {
  return (
    <>
      <Register role="admin" handleAlert={handleAlert} />
    </>
  );
}

export default AdminRegister;
