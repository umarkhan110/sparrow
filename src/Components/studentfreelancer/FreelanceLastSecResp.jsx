import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const FreelanceLastSecResp = () => {
    return (
        <div className='FreelanceLastSecResp'>
            <Container>
                <Row>
                    <Col xs={7} sm={6} style={{ alignSelf: "center", paddingLeft: "20px" }}>
                        <h2>Ready to make <br /> money your way?</h2>
                        <div className='FLastBtnDiv'>
                            <Link to="/signin" className='secondary green FLastBtn'>Get Started</Link>
                        </div>
                    </Col>
                    <Col xs={5} sm={6}>
                        <img src="/assets/images/studentfreelance/stdFinanceGirlImage.png" alt="" />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default FreelanceLastSecResp