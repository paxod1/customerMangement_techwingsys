import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsPersonFillAdd } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import './UserNavbar.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { LogoutData } from '../Redux/UserSlice';
import { TiHome } from "react-icons/ti";


function UserNavbar() {
  const dispatch = useDispatch()

  function logout() {
    dispatch(LogoutData())
  }

  return (
    <div className='userNavbar'>
      <Navbar collapseOnSelect expand="lg" className="bg-body-black">
        <Container>
          <Navbar.Brand>
            <img  src="https://res.cloudinary.com/dqgrcovgg/image/upload/v1741189757/WHITE----_2_jzrvnj.png" height={'30px'} width={'130px'} alt="" />

          </Navbar.Brand>


          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link style={{ textDecoration: 'none' }} to={'/'} >
                <Nav.Link href="#features">
                  <TiHome className='icons_adimin_navbar' /> Home
                </Nav.Link>
              </Link>
              <Link style={{ textDecoration: 'none' }} to={'/AddCustomer'} >
                <Nav.Link href="#features">
                  <BsPersonFillAdd className='icons_adimin_navbar' /> Add Custmer
                </Nav.Link>
              </Link>


              <Nav.Link>
                <Link style={{ textDecoration: 'none', color: 'white' }} to={'/AllCustomers'} >
                  <FaListUl className='icons_adimin_navbar' /> All Custmers
                </Link>

              </Nav.Link>


            </Nav>
            <Nav>
              <Nav.Link>
                <FaListUl className='icons_adimin_navbar' /> Profile
              </Nav.Link>
              <Nav.Link onClick={logout}>
                <FaListUl className='icons_adimin_navbar' /> Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default UserNavbar;
