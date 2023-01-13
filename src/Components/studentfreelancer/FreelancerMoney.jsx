import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const FreelancerMoney = () => {
    return (
        <div className='findStudent freelanceMoney'>
            <Container className='frelance-last-baner'>
                <Row>
                    <Col md={6}>
                        <h2 className='subheading-mb-reduc-2 mb-freelance-last'>Ready to become a student freelancer?</h2>
                        <div className='setTextFreelance'>
                            <Link to={(JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role === "client" ? "/dashboardRoute/all-students/" :
                                (JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role === "student" ? "/dashboardRoute/student-profile/" :
                                    "/signin"} className='secondary stdntBtn ml-0'>Get Started</Link>
                        </div>
                    </Col>
                    <Col md={6} className="innerImage">
                        <img src="/assets/images/studentfreelance/Group 822.png" alt="" />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default FreelancerMoney