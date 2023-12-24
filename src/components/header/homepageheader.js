import Logo from '../../logos/icon.png';

import React from 'react';

import { Navbar, Container, Nav } from 'react-bootstrap';

import DropdownNav from '../header/dropdown';

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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
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