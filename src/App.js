

import React, {useState, useEffect} from 'react';
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
  
  // setting logged in state to protect homepage route
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    console.log('loggedIn value:', loggedIn);
  }, [loggedIn]);

  return (
    <Router>
  <Routes>
  <Route path="/signup" element={<SignUpView />} />
  <Route path="/login" element={<LoginView setLoggedIn={setLoggedIn} />} />
  <Route path="/homepage" element={loggedIn ? <HomePageView /> : <LoginView setLoggedIn={setLoggedIn} />} />
  <Route path="/" element={<SignUpView />} />
</Routes>
</Router>
  );
}


export default App;

