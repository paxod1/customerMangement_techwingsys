import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsPersonFillAdd } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import './AdminNavbar.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { LogoutData } from '../Redux/AdminSlice';

function AdminNavbar() {
  const dispatch = useDispatch()

  function logout() {
    dispatch(LogoutData())
  }

  return (
    <div className='navbarAdmin'>
      <Navbar collapseOnSelect expand="lg" className="bg-body-black">
        <Container>
          <Link to={'/Admin'} style={{ textDecoration: 'none' }}>
            <Navbar.Brand>
            <img  src="https://res.cloudinary.com/dqgrcovgg/image/upload/v1741189757/WHITE----_2_jzrvnj.png" height={'30px'} width={'130px'} alt="" />
              
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link style={{ textDecoration: 'none' }} to={'/Usersignup'}>
                <Nav.Link href="#features">
                  <BsPersonFillAdd className='icons_adimin_navbar' /> Add-Customer Executive
                </Nav.Link>
              </Link>


              <Nav.Link>
                <Link style={{ textDecoration: 'none', color: 'white' }} to={'/AllExecutives'}>
                  <FaListUl className='icons_adimin_navbar' /> All-Executives
                </Link>

              </Nav.Link>


            </Nav>
            <Nav>

              <Nav.Link>
                <Link style={{ textDecoration: 'none', color: 'white' }} to={'/AllCustomersAdmin'}>
                <FaListUl className='icons_adimin_navbar' /> All Customers
              </Link>
            </Nav.Link>

            <Nav.Link onClick={logout}>
              <FaListUl className='icons_adimin_navbar' /> Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div >
  );
}

export default AdminNavbar;
