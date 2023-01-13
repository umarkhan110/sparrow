import React from 'react'
import { Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

const StudentNav = () => {
  return (
    <div className='dashboardheader'>
            <Navbar expand="lg">
        <Container>
            <div className='headerLeft'>
                <Link to="/"><img src="/assets/images/headerFooter/Logo.png" alt="" /></Link>
            </div>
            <div className='headerRight'>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/">Families</NavLink>
                        <NavLink to="/student-freelancer">Student Freelancers</NavLink>
                        <NavLink to="/about">Our Mission</NavLink>
                        <img className='userHedrImg' src="/assets/images/userimg.png" alt="" />
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Container>
    </Navbar>
    </div>
  )
}

export default StudentNav