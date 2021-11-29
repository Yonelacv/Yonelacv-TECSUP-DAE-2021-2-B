import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Route, BrowserRouter, Routes } from 'react-router-dom'

import App from './App';
import Users from './users';
import Contact from './contact';
import Notfound from './notfound';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap'

const routing = (
  <div>
    <BrowserRouter>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/usuarios">Users</Nav.Link>
              <Nav.Link href="/contacto">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/usuarios/:id" element={<Users />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  </div>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

