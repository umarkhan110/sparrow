import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const FreelancerNo = () => {
    return (
        <div className='freelancerNo setFreelanceNo'>
            <Container>
                <Row>
                    <Col md={6}>
                        <div className='hireStdntBox foBG'>
                            <h3>Say “No” to overtime & <br />Low-Paid Salaries</h3>
                            <p className='setPOfNo'>Find simple and high paying jobs that fit your schedule. We offer the freedom to work whenever it’s best for you by helping your local community.</p>
                            <div>
                                <Link to={(JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role === "client" ? "/dashboardRoute/all-students/" :
                                    (JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role === "student" ? "/dashboardRoute/student-profile/" :
                                        "/signin"} className='secondary hireBtn'>Get Started</Link>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}></Col>
                </Row>
            </Container>
        </div>

    )
}

export default FreelancerNo