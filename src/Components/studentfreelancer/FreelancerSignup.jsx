import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const FreelancerSignup = () => {
    return (
        <div className='freelancerSignup'>
            <div className='profileHead'>
                <h2 className='subheading-mb-reduc headingWithGreen_mobile'>Any Reasons Not to <span className='green'>Sign Up?</span></h2>
                <h6 className='subhead'>Become part of Sparrow community to work and earn money your way.</h6>
            </div>
            <Container>
                <Row className='laptopMain alignitem'>
                    <Col md={7}>
                        <div className='lptopImg setResonive'><img src="/assets/images/studentfreelance/StudentFreelanceSignupmackup.png" alt="" /></div>
                        {/* <div className='lptopImg setResonive1'><img src="/assets/images/studentfreelance/mobiele.webp" alt="" /></div> */}
                        <div className='lptopImg setResonive1 stdfreeLanceMobileStyle'><img src="/assets/images/studentfreelance/StudentFreelanceSignupmackup.png" alt="" /></div>

                    </Col>
                    <Col md={5}>
                        <div className='laptopBox bc1 setcirclePic'>
                            <div className='laptopBoxContent'>
                                <h4>Create your account</h4>
                                <p>Create an account with information about yourself. We’ll confirm your identity and verify your eligibility to use the platform. </p>
                            </div>
                        </div>
                        <div className='laptopBox bc2 setcirclePic'>
                            <div className='laptopBoxContent'>
                                <h4>Set your own schedule</h4>
                                <p>Get different job offers and connect with your local community. You decide how and when you want to work.</p>
                            </div>
                        </div>
                        <div className='laptopBox bc3 setcirclePic'>
                            <div className='laptopBoxContent'>
                                <h4>Get your full payment</h4>
                                <p>Enjoy your fair share. We guarantee the best pay for your work without high service fees like other platforms.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default FreelancerSignup