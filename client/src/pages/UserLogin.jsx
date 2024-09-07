import React from 'react';
import Login from '../components/Login';

const UserLogin = ({onLogin, handleAlert}) => {
  return (
    <>
      <Login role="user" onLogin={onLogin} handleAlert={handleAlert} />
    </>
  );
}

export default UserLogin;
