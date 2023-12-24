// import react 
import React from 'react';

// import components for sign up page 
import Login from '../components/login/loginform';

import Header from '../components/header/header';
import Footer from '../components/footer';

//sign up view 

function LoginView() {
    return (
      <div>
        <Header />
        <Login />
        <Footer />
      </div>
    );
  }
  
  export default LoginView;