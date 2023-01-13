import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function AboutExpanding() {
    return (
        <div className='findStudent findStudentAbout expanding'>
            <Container className='about-last-baner'>
                <Row>
                    <Col md={7} sm={12}>
                        <div className='expandingContent'>
                            <h2>We're expanding our team</h2>
                            <h4 className='fh4'>Send us a line </h4>
                            <h4 className='sh4'>We're always looking for brilliant, driven and ambitious people! If you'd like to become part of the dynamic team at Sparrow, please email us:</h4>
                            <h4 className='th4'>contact@spaarrow.com </h4>
                        </div>
                    </Col>
                    <Col md={5}>
                        <img className='none' src="/assets/images/about/5 1.png" alt="" />
                        {/* <img className='d-none makeMobileOnly' src="/assets/images/about/about_lastBannerMobile.png" alt="" /> */}

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AboutExpanding