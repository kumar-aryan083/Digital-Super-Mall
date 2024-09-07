import React from 'react';
import Register from '../components/Register';

const UserRegister = ({handleAlert}) => {
  return (
    <>
      <Register role="user" handleAlert={handleAlert} />
    </>
  );
}

export default UserRegister;
