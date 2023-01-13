import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const OfferNegotiation = () => {
  return (
    <Container>
    <div className='offerMain'>
        {/* <Container></Container> */}

        {/* </Col> */}
        <Row className='offerHed lyellow'>
            <Col md={4}>
                <p className='sentOffer'>Offer Negotiated</p>
            </Col>
            <Col md={4}></Col>
            <Col md={4} className="d-flex align-items-center">
                <p className='hourlyPay setpay'>Requested Pay </p>
                <p className='hourlyPrice'> $20.00</p>
            </Col>
        </Row>
        <div className='offerBodyContainer'>
            <Row>
                <h5 className='offerH5'>Task Description</h5>
                <p className='offerP'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eOkay so here is the offer please accept it so am start so here is working. Accept it so am start so  working... <span className='green'> View More</span></p>
            </Row>
            {/* <Row className='offerButtons d-flex justify-content-end'>
                <button className='offerBtn offWhite'>Cancel Task</button>
                <button className='offerBtn lyellow ml-12'>Pending</button>
            </Row> */}
        </div>
    </div>
</Container>
  )
}

export default OfferNegotiation