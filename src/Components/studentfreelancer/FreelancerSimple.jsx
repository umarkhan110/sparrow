import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const FreelancerSimple = () => {
    return (
        <div className='freelancerSimple'>
            <Container>
                <Row className='center columnRevers'>
                    <Col className='freelancerSimpleLeft' md={6}>
                        <img src="/assets/images/studentfreelance/ezgif.com-gif-maker (1).png" alt="" />
                    </Col>
                    <Col md={6} className="freelancerSimpleText">
                        <div className='sethedwitd'>
                            <h2 className='subheading-mb-reduc font40 marginRight12per'>Simple & Flexible Work on Your Terms</h2>
                            <h6 className='setResonive mb-setsize'>Get the freedom to design your own work schedule and make money on simple tasks. Use Sparrow to pay tuition and living expenses as well as network with local families.</h6>
                            <h6 className='setResonive1'>Get the freedom to design your own work schedule and make money on simple tasks. Use Sparrow to pay tuition and living expenses as well as network with local families.</h6>
                            <div className='setResonive'>
                                <Link style={{ display: 'inline-Flex', verticalAlign:'middle', textAlign: 'center' }}
                                    to={(JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role === "client" ? "/dashboardRoute/all-students/" :
                                        (JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role === "student" ? "/dashboardRoute/student-profile/" :
                                            "/signin"}
                                    className='primary btnheightFreelance'>Get Started</Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default FreelancerSimple