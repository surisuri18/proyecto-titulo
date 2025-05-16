import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterUser from '../pages/Cliente/RegisterUser';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterUser />} />
    </Routes>
  );
};

export default AppRoutes;
