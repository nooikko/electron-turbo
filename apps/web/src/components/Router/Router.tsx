import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your components here
import { Home } from '../../pages';

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
      </Routes>
    </BrowserRouter>
  );
};
