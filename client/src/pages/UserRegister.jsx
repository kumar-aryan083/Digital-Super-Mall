import React from 'react';
import Register from '../components/Register';

const UserRegister = ({handleAlert, user}) => {
  return (
    <>
      <Register role="user" handleAlert={handleAlert} user={user} />
    </>
  );
}

export default UserRegister;
