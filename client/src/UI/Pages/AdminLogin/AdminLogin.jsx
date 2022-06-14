import React, { useState } from 'react';
import './AdminLogin.scss';
import {
  login,
  selectIsAuthenticated,
  selectLoading,
  selectAdmin,
} from '../../../Redux/adminSlice';

import { useSelector, useDispatch } from 'react-redux';

const AdminLogin = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);
  const admin = useSelector(selectAdmin);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <div className='AdminLogin'>
      <h1 className='Title'>AdminLogin</h1>
      <form className='Form' onSubmit={(e) => submitForm(e)}>
        <label htmlFor='' className='Label'>
          Username
        </label>
        <input
          type='text'
          className='Input'
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <label htmlFor='' className='Label'>
          Password
        </label>
        <input
          type='password'
          className='Input'
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input type='submit' className='Btn' />
      </form>
    </div>
  );
};

export default AdminLogin;
