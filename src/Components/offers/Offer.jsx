import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import OfferNegotiation from './OfferNegotiation'

const Offer = () => {
    return (
        <>
        <Container>
            <div className='offerMain'>
                <Row className='offerHed'>
                    <Col md={4}>
                        <p className='sentOffer'>Sent Offer</p>
                    </Col>
                    <Col md={4}></Col>
                    <Col md={4} className="d-flex align-items-center">
                        <p className='hourlyPay'>Hourly Pay</p>
                        <p className='hourlyPrice'> $20.00</p>
                    </Col>
                </Row>
                <div className='offerBodyContainer'>
                    <Row className='offerBody'>
                        <h5 className='offerH5'>Your offer</h5>
                        <div className='setOfferDiv'>
                        <div>
                            <ul>
                                <li><img src="/assets/images/offer/gata.png" alt="" /><span>Pet Sitting</span></li>
                                <li><img src="/assets/images/offer/loc.png" alt="" /><span>Menlo Park, CA</span></li>
                            </ul>
                        </div>
                        <div className='mL21'>
                            <ul>
                                <li><img src="/assets/images/offer/calender.png" alt="" /><span>20/04/2022</span></li>
                                <li><img src="/assets/images/offer/clock.png" alt="" /><span>Monday 9PM-4AM</span></li>
                            </ul>
                        </div>
                        </div>
                    </Row>
                    <Row>
                        <h5 className='offerH5'>Task Description</h5>
                        <p className='offerP'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eOkay so here is the offer please accept it so am start so here is working. Accept it so am start so  working... <span className='green'> View More</span></p>
                    </Row>
                    <Row className='offerButtons d-flex justify-content-end'>
                        <button className='offerBtn offWhite'>Cancel Task</button>
                        <button className='offerBtn lyellow ml-12'>Pending</button>
                    </Row>
                </div>
            </div>
        </Container>
        <OfferNegotiation/>
        </>
    )
}

export default Offer