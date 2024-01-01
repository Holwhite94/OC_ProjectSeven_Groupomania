// react
import React, {useState, useEffect} from 'react';

// bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

// rouer
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

// views
import SignUpView from './Views/signup';
import LoginView from './Views/login';
import HomePageView from './Views/homepage';

// sass file
import './scss/app.scss'
 

function App() {
  
  // setting logged in state to protect homepage route
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log('loggedIn value:', loggedIn);
  }, [loggedIn]);

  // routes + passing down loggedIn so state can be used to protect homepage
  return (
  <Router>
  <Routes>
  <Route path="/signup" element={<SignUpView />} />
  <Route path="/login" element={<LoginView loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
  <Route path="/homepage" element={loggedIn ? <HomePageView /> : <LoginView loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
  <Route path="/" element={<SignUpView />} />
</Routes>
</Router>
  );
}


export default App;

