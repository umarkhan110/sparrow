import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function AboutBanner() {
    // logout class because whhen user is logiut out we have to remove space b/w header and content
    // useEffect(() => {
    //     if (!JSON.parse(localStorage.getItem('sparrowSignIn'))) {
    //         // debugger
    //         const element = document.querySelector('.aboutBanner');
    //         element.classList.add("logOutClass");
    //     } else {
    //         const element = document.querySelector('.aboutBanner');
    //         element.classList.remove("logOutClass");
    //     }
    // }, [])
    return (
        <>
        <div className='aboutBanner logInClass pt-5'>
            <Container>
                <Row className='center'>
                    <Col md={6} className="aboutBannerMobileHeading">
                        <h2>Welcome to Sparrow!</h2>
                        <h6 className='seth6abou'>Our mission is to help all college students obtain academic success by making work more flexible and accessible.</h6>
                    </Col>
                    <Col md={6}>
                        <div>
                            <img className='setResonive' src="/assets/images/about/Group 21894.png" alt="" />
                            <img className='setResonive1 elementCenter' src="/assets/images/about/imgaboutbanner.png" alt="" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default AboutBanner