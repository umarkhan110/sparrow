import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function FreelancerSupportStudent() {
    return (
        <div className='stdentSupport freelanceStudent1'>
            <Container>
                <Row>
                    <Col md={4} className='px-3'>
                        <div className='trustSafety'>
                            <div><img src="/assets/images/studentfreelance/flexibleWorkHour_test.svg" alt=''/>
                                {/* <img src="/assets/images/studentfreelance/flexibleWorkHour.svg" className='setResonive'/>
                                <img src="/assets/images/studentfreelance/flexibleWorkHour_mobile.svg" alt="" className='makeMobileOnly setResonive1'/> */}
                            </div>
                            <div className='trustSafetycontent'>
                                <h4 className='green'>Flexible Work Hours</h4>
                                <p>Design your own work schedule, so you can decide how to prioritize exactly what’s on your agenda.</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={4} className='px-4'>
                        <div className='trustSafety'>
                            <div><img src="/assets/images/studentfreelance/Student Freelancers-simple jobs.svg" alt="" /> </div>
                            <div className='trustSafetycontent'>
                                <h4 className='yellow'>Simple Jobs</h4>
                                <p>Our platform makes it convenient to find simple work whenever you need it. You decide what tasks you want to work with.</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={4} className='px-4'>
                        <div className='trustSafety'>

                            <div><img src="/assets/images/studentfreelance/flexibleWork_(2)_test.svg" alt="" /> </div>
                            <div className='trustSafetycontent'>
                                <h4 className='blue'>Pay that Matters</h4>
                                <p>We provide a simple and secure income as well as a great pay. You don’t have to worry about finding a job again.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default FreelancerSupportStudent