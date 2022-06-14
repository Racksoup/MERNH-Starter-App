import React from 'react';
import './App.scss';
import Home from './UI/Pages/Home/Home.jsx';
import AdminLogin from './UI/Pages/AdminLogin/AdminLogin.jsx';

import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className='App-Main'>
      <div className='App-Background' />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/admin-login' element={<AdminLogin />} />
      </Routes>
    </div>
  );
};

export default App;
