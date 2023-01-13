import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
function HomeFingerPrints() {
    return (
        <div className='fingerPrints'>
            <div className='profileHead'>
                <h2>Help at <span className='green mobile-black'>Your</span><span className='green'> Fingertips</span></h2>
                <h6 className='subhead'>Only a few clicks away</h6>
            </div>
            <div>
                <Container>
                    <Row>
                        <Col md={4}>
                            <div className='homeCircle'>
                                <div><img src="/assets/images/home/gata.png" alt="" /></div>
                                <div className='homeCircleContent'>
                                    <h4>Describe your task</h4>
                                    <p>Describe the time, place and <br/> exactly what you need help<br/> with for your task.</p>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className='homeCircle c2'>
                                <div><img src="/assets/images/home/gata.png" alt="" /></div>
                                <div className='homeCircleContent'>
                                    <h4>Describe your task</h4>
                                    <p>Describe the time, place and <br/> exactly what you need help<br/> with for your task.</p>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className='homeCircle c3'>
                                <div><img src="/assets/images/home/gata.png" alt="" /></div>
                                <div className='homeCircleContent'>
                                    <h4>Describe your task</h4>
                                    <p>Describe the time, place and <br/> exactly what you need help<br/> with for your task.</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default HomeFingerPrints