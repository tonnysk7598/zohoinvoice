import React from "react";
import { Navbar, NavbarBrand, Container } from "reactstrap";

class Header extends React.Component {
  render() {
    return (
      <Navbar
        color={"dark"}
        expand="lg"
        className={"navbar-absolute fixed-top navbar-transparent"}
      >
        <Container fluid>
          <NavbarBrand href="#">Zoho Invoice Integration</NavbarBrand>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
