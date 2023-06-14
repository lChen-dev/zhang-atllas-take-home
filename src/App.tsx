import type { FC } from 'react';
import React from 'react';

import { Routes, Route } from 'react-router-dom';
import './App.css';
import Loading from './components/Loading';
import Header from './components/Header';
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Register = React.lazy(() => import('./pages/Register'));
const Detail = React.lazy(() => import('./pages/Detail'));
const AddReview = React.lazy(() => import('./pages/AddReview'));

const App: FC = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Header />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/register' element={<Register />} />
        <Route path='/detail/:agent_id' element={<Detail />} />
        <Route path='/add-review/:agent_id' element={<AddReview />} />
      </Routes >
    </React.Suspense>
  );
};

export default App;
