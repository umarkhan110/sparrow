import React from 'react'
import ContactUsIcon from '../contactus/ContactUsIcon'
import AboutBanner from './AboutBanner'
import AboutConnecting from './AboutConnecting'
import AboutExpanding from './AboutExpanding'
import AboutFaq from './AboutFaq'
import AboutInspiration from './AboutInspiration'

function AboutMain() {
    return (
        <div>
            <ContactUsIcon />
            <AboutBanner />
            <AboutConnecting />
            <AboutInspiration />
            <AboutFaq />
            <AboutExpanding />
        </div>
    )
}

export default AboutMain