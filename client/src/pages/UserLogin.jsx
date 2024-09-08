import React from 'react';
import Login from '../components/Login';

const UserLogin = ({onLogin, handleAlert, user}) => {
  return (
    <>
      <Login role="user" onLogin={onLogin} handleAlert={handleAlert} user={user} />
    </>
  );
}

export default UserLogin;
