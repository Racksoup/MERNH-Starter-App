import React from 'react';
import './App.scss';
import Home from './UI/Pages/Home/Home.jsx';

import { Route, Routes } from 'react-router-dom';

const Base = () => {
  return (
    <div className='App-Main'>
      <div className='App-Background' />
      <Routes>
        <Route exact path='/' element={<Home />} />
      </Routes>
    </div>
  );
};

export default Base;
