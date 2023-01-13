import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function AboutInspiration() {

    const handle_showLess = () => {
        setMakeTextParam_mobile(<p className='setResonive1'>As recent graduates with multiple jobs to pay for tuition and living expenses during college, we noticed the difficulty of finding flexible work that fit our schedule. We relied on a part-time job to finance... <span className='viewMOreSPecial' onClick={handle_showMore}>View More</span></p>)
    }

    const handle_showMore = () =>{
        setMakeTextParam_mobile(<><p className='setResonive1 para-hire-about'>As recent graduates with multiple jobs to pay for tuition and living expenses during college, we noticed the difficulty of finding flexible work that fit our student schedule. We relied on a part-time job to finance our education, but often couldn’t commit due to academic and athletic commitments.</p>
        <p className='setResonive1 para-hire-about'>Instead, many of us would help local families with babysitting, dog walking and other errands. After realizing the growing concern among college students and the demand for home assistance among families, Sparrow became a reality.</p>
        <p className='setResonive1 para-hire-about'>Sparrow is committed to offer college students flexible work to successfully finance their academics and lower student debt by helping their local community. Our mission is to help all of our students succeed, and we hope to get your support. <span className='viewMOreSPecial' onClick={handle_showLess}>Show Less</span></p> 
        </>)
    }

    const [makeTextParam_mobile, setMakeTextParam_mobile] = useState(<p className='setResonive1'>As recent graduates with multiple jobs to pay for tuition and living expenses during college, we noticed the difficulty of finding flexible work that fit our schedule. We relied on a part-time job to finance... <span className='viewMOreSPecial' onClick={handle_showMore}>View More</span></p>);

    return (
        <div className='hireStudent inpiration'>
            <Container>
                <Row>
                    <Col md={6}>
                        <div className='hireStdntBox'>
                            <h3>Inspiration born from experience</h3>
                            <p className='setResonive para-hire-about'>As recent graduates with multiple jobs to pay for tuition and living expenses during college, we noticed the difficulty of finding flexible work that fit our student schedule. We relied on a part-time job to finance our education, but often couldn’t commit due to academic and athletic commitments.</p>
                            <p className='setResonive para-hire-about'>Instead, many of us would help local families with babysitting, dog walking and other errands. After realizing the growing concern among college students and the demand for home assistance among families, Sparrow became a reality.</p>
                            <p className='setResonive para-hire-about'>Sparrow is committed to offer college students flexible work to successfully finance their academics and lower student debt by helping their local community. Our mission is to help all of our students succeed, and we hope to get your support.</p>
                            {makeTextParam_mobile}
                        </div>
                    </Col>
                    <Col md={6}></Col>
                </Row>
            </Container>
        </div>
    )
}

export default AboutInspiration