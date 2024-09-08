import React from 'react';
import Login from '../components/Login';

const AdminLogin = ({onLogin, handleAlert, user}) => {
  return (
    <>
      <Login role='admin' onLogin={onLogin} handleAlert={handleAlert} user={user} />
    </>
  );
}

export default AdminLogin;
