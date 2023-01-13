import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const FreelancerBanner = () => {

    return (
        <div className='freelanceStudent logInClass mb-10'>
            <Container>
                <Row className='columnRevers'>
                    <Col md={6} className="mobileStudentText">
                        <h2 className='baner-mb'>Become your own <span className='green'>Student Freelancer</span></h2>
                        <h6 className='setOn mr-2'>Connect with local families to help with daily tasks and errands. Get paid to work on your terms while you focus on what matters.</h6>
                        <div className='setResonive1 mT25px'>
                            <Link style={{ display: 'inline-Flex', verticalAlign:'middle', textAlign: 'center' }} to={(JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role === "client" ? "/dashboardRoute/all-students/" :
                                (JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role === "student" ? "/dashboardRoute/student-profile/" :
                                    "/signin"}
                                className='primary freelanceBtn'>Join Today</Link>
                        </div>
                        <div className='bannerBtnCounter none'>
                            <div className='setResonive'>
                                <Link to={(JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role === "client" ? "/dashboardRoute/all-students/" :
                                    (JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role === "student" ? "/dashboardRoute/student-profile/" :
                                        "/signin"}
                                    className='primary freelanceBtn'>Start Working</Link>
                            </div>
                            <div className='bannerCounter setResonive'>
                                <div className='cont1' style={{ borderRight: "1px solid #C4C4C4", paddingRight: "24px" }}>
                                    <h6 className='green'>5k+</h6>
                                    <p style={{ paddingLeft: "18px" }}>Students <br />signed up</p>
                                </div>
                                <div className='cont1' style={{ paddingLeft: "24px" }}>
                                    <h6 className='green'>10k+ </h6>
                                    <p style={{ paddingLeft: "18px" }}>Tasks<br />completed</p>
                                </div>
                            </div>
                        </div>

                        
                    </Col>
                    <Col md={6} className="mobileStudentImage">
                        <div>
                            <img className='bannerImg setResonive' src="/assets/images/studentfreelance/banner.png" alt="" />
                            <img className='bannerImg1 setResonive1' src="/assets/images/studentfreelance/stdFreelace_mobile.png" alt="" />
                        </div>
                    </Col>
                </Row>
            </Container>
                        <div className='bannerBtnCounter setResonive1 stdfreeLanceBanerBlowBtn'>
                            <div className='bannerCounter'>
                                <div className='cont1' style={{ borderRight: "1px solid #C4C4C4", paddingRight: "24px" }}>
                                    <h6 className='green'>5k+</h6>
                                    <p style={{ paddingLeft: "18px" }}>Students <br />signed up</p>
                                </div>
                                <div className='cont1' style={{ paddingLeft: "24px" }}>
                                    <h6 className='green'>10k+ </h6>
                                    <p style={{ paddingLeft: "18px" }}>Tasks<br />completed</p>
                                </div>
                            </div>
                        </div>
            
        </div>
    )
}

export default FreelancerBanner