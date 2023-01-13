import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function AboutConnecting() {
    return (
        <div className='connecting'>
            <div className='profileHead'>
                <h2>Connecting <span className='green'>Made Easy</span></h2>
                <h6 className='subhead'>Our platform offers college students a simple way to find flexible work to offset school costs by providing local families a helping hand.</h6>
            </div>
            <Container className='about-connecting-mb'>
                <Row className='align-items-center'>
                    <Col md={7}>
                        <div className='connectPartial'>
                            <img src="/assets/images/heavyImg/About Us page-Find Student helpers.png" alt="" />
                        </div>
                    </Col>
                    <Col md={5}>
                        <div className='connectPartial mb-connectpartial'>
                            <div className='connectPartialContent'>
                                <h2 className='marginRight15per'>Find Student helpers in your area</h2>
                                <p>We ensure easy access to trusted college students whenever you need it. You don’t have to do everything on your own, when you can have someone to help you.</p>
                                <Link style={{ display: 'inline-Flex', verticalAlign:'middle', textAlign: 'center' }} to={(JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role === "client" ? "/dashboardRoute/all-students/" :
                                    (JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role === "student" ? "/dashboardRoute/student-profile/" :
                                        "/signin"} className='primary cpnnectAboutBtn'>Get Started</Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AboutConnecting