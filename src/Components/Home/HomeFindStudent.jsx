import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function HomeFindStudent() {
    return (
        <div className='findStudent last-baaner-hme'>
            <Container className='home-last-baner'>
                <Row className='homeLastBannerFamily_mobile'>
                    <Col md={6} className='last-baner-padingz col-8'>
                        <h2 className='subheading-mb-reduc-2'>Want to get more done for your family?</h2>
                        <div>
                            <Link to={(JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role === "client" ? "/dashboardRoute/all-students/" :
                                (JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role === "student" ? "/dashboardRoute/student-profile/" :
                                    "/signin"}
                                className='secondary hireBtn ml-80'>Get Started</Link>
                        </div>
                    </Col>
                    <Col md={6} className='last-baner-padingz col-4'>
                        <img className='homebabyimg none' src="/assets/images/home/babyMan.png" alt="" />
                        <img className='homebabyimg d-none makeMobileOnly' src="/assets/images/home/kelly-sikkema-mobileSVG.svg" alt="" />

                    </Col>
                </Row>  
            </Container>
        </div>
    )
}

export default HomeFindStudent