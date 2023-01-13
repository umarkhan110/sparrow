import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import HomeTasksResponsive from './HomeTasksResponsive'

function HomeTasks() {
    return (
        <div className='tasks'>
            {/* <div className='mobilelkiImg'>
                <img src="/assets/images/home/Group22402 (1).png" alt="" />
            </div> */}
            <Container className='bgNewTask '>
                <div className='profileHead width55'>
                    <h2>Most <span className='green'>Popular Tasks</span></h2>
                    <h6 className='subhead'>A go-to team at your fingertips. Whatever task you need help with, they’ve got you covered.</h6>
                </div>

                <div className='bg-mobile-mb'>
                    <Row className='bgMobile'>
                        <Col lg={3} md={5} sm={6} className='mobbile-mb-task'>
                            <div className='taskBox removeFlex'>
                                <div className='boxImg'><img src="/assets/images/studentfreelance/Housekeeping.svg" alt="" /></div>
                                <div className='taskBoxContent'>
                                    <h4 className='green'>Housekeeping</h4>
                                    <p>Find a student to help with any <br /> cleaning chores inside your house.</p>
                                </div>
                            </div>
                            <div className='taskBox removeFlex'>
                                <div className='boxImg'><img src="/assets/images/studentfreelance/Moving.svg" alt="" /></div>
                                <div className='taskBoxContent'>
                                    <h4 className='green'>Moving</h4>
                                    <p>Find a student to carry boxes and furniture to prepare your new home.</p>
                                </div>
                            </div>



                        </Col>
                        <Col lg={3} md={5} sm={6} className='mobbile-mb-task'>
                            
                            
                            <div className='taskBox removeFlex'>
                                <div className='boxImg'><img src="/assets/images/studentfreelance/Tutoring.svg" alt="" /></div>
                                <div className='taskBoxContent'>
                                    <h4 className='green'>Tutoring</h4>
                                    <p>Book a tutor to help your child improve grades and class performance.</p>
                                </div>
                            </div>
                            <div className='taskBox removeFlex'>
                                <div className='boxImg'><img src="/assets/images/studentfreelance/Child Care.svg" alt="" /></div>
                                <div className='taskBoxContent'>
                                    <h4 className='green'>Child Care</h4>
                                    <p>Get a babysitter to look after your child, while you focus on other daily activities.</p>
                                </div>
                            </div>
                        </Col>

                        <Col lg={3} md={5} sm={6} className='mobbile-mb-task'>
                            <div className='taskBox removeFlex'>
                                <div className='boxImg'><img src="/assets/images/studentfreelance/Pet Sitting.svg" alt="" /></div>
                                <div className='taskBoxContent'>
                                    <h4 className='green'>Pet Sitting</h4>
                                    <p>Find a student pet-lover to take your furry friend out for a long walk. </p>
                                </div>
                            </div>
                            <div className='taskBox removeFlex'>
                                <div className='boxImg'><img src="/assets/images/studentfreelance/Eldercare.svg" alt="" /></div>
                                <div className='taskBoxContent'>
                                    <h4 className='green'>Eldercare</h4>
                                    <p>Let a cheerful student provide care and home visits for your loved ones.</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={3} md={5} sm={6} className='mobbile-mb-task'>
                            <div className='taskBox removeFlex'>
                                <div className='boxImg'><img src="/assets/images/studentfreelance/Sports Coaching.svg" alt="" /></div>
                                <div className='taskBoxContent'>
                                    <h4 className='green'>Sports Coaching</h4>
                                    <p>Book a student-athlete to improve your kid's athletic skills or just have fun.</p>
                                </div>
                            </div>
                            <div className='taskBox removeFlex'>
                                <div className='boxImg'><img src="/assets/images/studentfreelance/Yard Work.svg" alt="" /></div>
                                <div className='taskBoxContent'>
                                    <h4 className='green'>Yard Work</h4>
                                    <p>Let a student water plants, remove dirt or mow the lawn in your backyard.</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <HomeTasksResponsive />
            </Container>

            <Link style={{ display: 'Block', textAlign: 'center', paddingTop: '3%', marginTop: '10px' }} to={(JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role === "client" ? "/dashboardRoute/all-students/" :
                                    (JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role === "student" ? "/dashboardRoute/student-profile/" :
                                        "/signin"} className='primary cpnnectAboutBtn makeMobileOnly setResonive1'>Get Started</Link>
        </div>
    )
}

export default HomeTasks