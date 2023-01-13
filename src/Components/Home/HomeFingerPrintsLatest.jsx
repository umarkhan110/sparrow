import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
const HomeFingerPrintsLatest = () => {
    return (
        <div className='fingerPrintsL freelancerSignup'>
            <div className='profileHead widthHomeR'>
                {/* <h2>Help at <span className='green'>Your Fingertips</span></h2> */}
                <h2>Help at <span className='green mobile-black'>Your</span><span className='green'> Fingertips</span></h2>

                <h6 className='subhead'>Only a few clicks away. It’s fast and free to get started with no commitments.</h6>
            </div>
            <div>
                <Container>

                    <Row className='laptopMain alignitem'>
                        <Col md={5} className="fingerPrintText_mobile">
                            <div className='laptopBox bc1 mr0'>
                                {/* <div className='boxImg'><img src="/assets/images/home/gata.png" alt="" /></div> */}
                                {/* <img src="/assets/images/home/cc1.png" alt="" /> */}
                                <div className='laptopBoxContent'>
                                    <h4>Add your task</h4>
                                    <p>Create a task and describe exactly what you need and when you need help with it. You can always change the details later.</p>
                                </div>
                            </div>
                            <div className='laptopBox bc2 mr0'>
                                {/* <div className='boxImg'><img src="/assets/images/home/cpu.png" alt="" /></div> */}
                                <div className='laptopBoxContent'>
                                    <h4>Invite a few students</h4>
                                    <p>Invite a few suitable students that fit the requirements for your task. You simply just wait for the first student to reply.</p>
                                </div>
                            </div>
                            <div className='laptopBox bc3 mr0'>
                                {/* <div className='boxImg'><img src="/assets/images/home/msg.png" alt="" /></div> */}
                                <div className='laptopBoxContent'>
                                    <h4>Get in contact</h4>
                                    <p>Get in direct contact with the first available student. Sit back and enjoy the extra time for what matters most to you.</p>
                                </div>
                            </div>
                        </Col>
                        <Col md={7} className="fingerPrintImage_mobile">
                            {/* <div className='lptopImg'><img src="/assets/images/heavyImg/Home page-Help at Your Fingertips.webp" alt="" /></div> */}
                            <div className='lptopImg'><img src="/assets/images/heavyImg/HomePageStdProfile.png" alt="" /></div>

                        </Col>

                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default HomeFingerPrintsLatest