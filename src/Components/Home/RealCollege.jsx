import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function RealCollege() {
    return (
        <div className='realCollegeMain'>
            <Container>
                <Row className='align-items-center'>
                    <Col md={6} className="img__CollageMain">
                        <div className='sectionHome_realCollege'>
                            <img className='realCLgimg' src="/assets/images/home/real college.png" alt="" />
                        </div>
                    </Col>
                    <Col md={6} className="text__CollageMain">
                        <div className='connectPartial mb-connectpartial'>
                            <div className='connectPartialContent setingwidth'>
                                <h2>real College students to help you handle it all</h2>
                                <p>We believe our local students can get your family in sync. Stop spending endless hours searching the web, browsing through ads or reviews you can’t trust. With Sparrow, you can connect with a student at anytime.</p>
                                {/*remove for desktop:  display: 'inline-Block', */}
                                <Link style={{  textAlign: 'center' }} to={(JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role === "client" ? "/dashboardRoute/all-students/" :
                                    (JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role === "student" ? "/dashboardRoute/student-profile/" :
                                        "/signin"} className='primary cpnnectAboutBtn setResonive'>Get Started</Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default RealCollege