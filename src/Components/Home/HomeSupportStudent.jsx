import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function HomeSupportStudent() {
    return (
        <div className='stdentSupport'>
            <Container>
                <Row>
                    <Col md={4} className='px-3'>
                        <div className='trustSafety'>
                            <div><img src="/assets/images/home/Group 8806.svg" alt="" /> </div>
                            <div className='trustSafetycontent'>
                                <h4 className='green'>Support Students</h4>
                                <p>Help your community of local college students finance their education with jobs that allow them to balance work & school life.</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}  className='px-3'>
                        <div className='trustSafetys'>
                            <div><img src="/assets/images/home/Group 8808.svg" alt="" /> </div>
                            <div className='trustSafetycontent'>
                                <h4 className='yellow'>Trust & Safety</h4>
                                <p>We provide an extensive background check and verify students through their college to ensure the highest safety and trust.</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={4}  className='px-4'>
                        <div className='trustSafety'>
                            <div><img src="/assets/images/home/Group 8809.svg" alt="" /> </div>
                            <div className='trustSafetycontent'>
                                <h4 className='blue'>Time on Hands</h4>
                                <p>Sparrow helps you get more things done so there’s more time for what matters most to your family.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HomeSupportStudent