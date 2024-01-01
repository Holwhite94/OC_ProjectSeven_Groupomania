// import logo
import Logo from '../../logos/icon.png';
// import react
import React from 'react';
// import navbar from bootstrap 
import { Navbar, Container, Nav } from 'react-bootstrap';
// import dropdown component 
import DropdownNav from '../header/dropdown';

//header for homepage WITH dropdown
function HomePageHeader() {


  return (

    <Navbar id="homeNav" expand="lg" bg="light" variant="light">
      <Container fluid>
        <Navbar.Brand id="homeNavText" href="#home">Groupomania</Navbar.Brand>
        <Navbar.Brand href="#home" className="mr-auto">
          <img
            id="homeNavImg"
            src={Logo}
            height="60"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            < DropdownNav />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // </>
  );
}

export default HomePageHeader;