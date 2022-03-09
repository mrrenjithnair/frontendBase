import React from 'react';
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export const Component = ({ count, handleIncrementClick, handleDecrementClick }) => (
  <div>

  <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/link">Link</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    <h1>Hello world Redux Saga! {count}</h1>
    <Button onClick={handleIncrementClick} variant="outline-success">Increment</Button>{' '}

    <Button onClick={handleDecrementClick} variant="outline-danger">Decrement</Button>{' '}

  </div>
);
