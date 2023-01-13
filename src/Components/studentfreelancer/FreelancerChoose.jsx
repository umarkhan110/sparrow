import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import FreelanceTaskResponsive from './FreelanceTaskResponsive'

const FreelancerChoose = () => {
    return (
        <div className='freelancerChoose'>
            <div className='profileHead setChooseF'>
                <h2 className='subheading-mb-reduc headingWithGreen_mobile'>Choose Tasks <span className='mobile-green setResonive'>that</span><span className='formobileOnly mobile-green'>that</span><span className='green'> Fit You</span></h2>
                <h6 className='subhead'>You decide what simple tasks you want to help with to make money.</h6>
            </div>
            <Container>
                <Row className='freelanceCircle'>
                    <Col md={3}>
                        <div className='box'>
                            <div className='freeChoose_Icon'>
                                <img src="/assets/images/studentfreelance/Housekeeping.svg" alt="" className='w-100 h-100'/>
                            </div>
                            <h4>Housekeeping</h4>
                            <p>Help with dishes, vacuuming, window cleaning and other errands in the house.</p>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className='box'>
                            <div className='freeChoose_Icon'>
                                <img src="/assets/images/studentfreelance/Tutoring.svg" alt="" className='w-100 h-100' />
                            </div>
                            <h4>Tutoring</h4>
                            <p>Tutor children in any subject to help improve their grades in the classroom.</p>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className='box'>
                            <div className='freeChoose_Icon'>
                                <img src="/assets/images/studentfreelance/Pet Sitting.svg" alt="" className='w-100 h-100'/>
                            </div>
                            <h4>Pet Sitting</h4>
                            <p>Get paid to play around with pets or take them for a long work in your neighbourhood. </p>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className='box'>
                            <div className='freeChoose_Icon'>
                                <img src="/assets/images/studentfreelance/Sports Coaching.svg" alt="" className='w-100 h-100'/>
                            </div>
                            <h4>Sports Coaching</h4>
                            <p>Coach kids in your favorite college sport to advance and develop their athletic skills.</p>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className='box'>
                            <div className='freeChoose_Icon'>
                                <img src="/assets/images/studentfreelance/Moving.svg" alt="" className='w-100 h-100'/>
                            </div>
                            <h4>Moving</h4>
                            <p>Give families an extra hand carrying boxes and preparing for their new home.</p>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className='box'>
                            <div className='freeChoose_Icon'>
                                <img src="/assets/images/studentfreelance/Child Care.svg" alt="" className='w-100 h-100'/>
                            </div>
                            <h4>Child Care</h4>
                            <p>Babysit and play with young children, while their parents are busy with other errands.</p>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className='box'>
                            <div className='freeChoose_Icon'>
                                <img src="/assets/images/studentfreelance/Eldercare.svg" alt="" className='w-100 h-100'/>
                            </div>
                            <h4>Eldercare</h4>
                            <p>Take care of the elderly by cherising and helping them carry out their daily tasks.</p>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className='box'>
                            <div className='freeChoose_Icon'>
                                <img src="/assets/images/studentfreelance/Yard Work.svg" alt="" className='w-100 h-100' />
                            </div>
                            <h4>Yard Work</h4>
                            <p>Earn money by mowing the lawn, remove dirt and water plants to clean the backyard.</p>
                        </div>
                    </Col>
                </Row>

                <FreelanceTaskResponsive />
            </Container>
        </div>
    )
}

export default FreelancerChoose