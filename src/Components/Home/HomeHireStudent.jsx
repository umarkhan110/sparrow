import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function HomeHireStudent() {
    return (
        <div className='hireStudent'>
            <Container>
                <Row>
                    <Col md={6}>
                        <div className='hireStdntBox'>
                            <h3 className='fntsize28'>Hire & Support Your <br />Local Students </h3>
                            <p>Sparrow connects you with trusted college students to support your family, from caring for your children to managing your personal and household affairs. Lets find a qualified and reliable student for your task.</p>
                            <Link to={(JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role === "client" ? "/dashboardRoute/all-students/" :
                            (JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role === "student" ? "/dashboardRoute/student-profile/" :
                            "/signin"} className='secondary hireBtn mt30'>Book a Student</Link>
                        </div>
                    </Col>
                    <Col md={6}></Col>
                </Row>
            </Container>
        </div>
    )
}

export default HomeHireStudent