import React from 'react';
import Login from '../components/Login';

const AdminLogin = ({onLogin, handleAlert}) => {
  return (
    <>
      <Login role='admin' onLogin={onLogin} handleAlert={handleAlert} />
    </>
  );
}

export default AdminLogin;
