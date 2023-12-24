// import react 
import React from 'react';

// import components for sign up page 
import SignUpForm from '../components/signup/signupform';

import Header from '../components/header/header';
import Footer from '../components/footer';

//sign up view 

function SignUpView() {
    return (
      <div>
        <Header />
        <SignUpForm />
        <Footer />
      </div>
    );
  }
  
  export default SignUpView;