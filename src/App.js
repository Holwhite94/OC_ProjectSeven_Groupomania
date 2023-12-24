

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import necessary components

import SignUpView from './Views/signup';
import LoginView from './Views/login';
import HomePageView from './Views/homepage';

import './scss/app.scss'

// react router:
// enables navigation and routing in single page application 
// wrap components with router 
// use exact path to ensure component only renedered with url match exactly 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/homepage" element={<HomePageView />} />
        <Route path="/" element={<SignUpView />} />
      </Routes>
    </Router>
  );
}

// add / for default page e.g first page rendered

export default App;

