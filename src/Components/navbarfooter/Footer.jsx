import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='foot'>
            <div className='footTop'>
                <div className='footSet'>
                    <div className='lFoot'>
                        <Link className='footLink' to="/privacy-policy">Privacy Policy</Link>
                        <Link className='footLink' to="/terms">Terms of Service</Link>
                        <Link className='footLink' to="/sparrow-user-pledge">Sparrow User Pledge</Link>
                        <Link className='footLink' to="/signInRoute/faq">FAQ</Link>
                        <Link className='footLink' to="/signInRoute/contact-us">Contact Us</Link>
                    </div>
                </div>
            </div>
            <div className='footBottom'>
                <p>© 2022, Sparrow. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer