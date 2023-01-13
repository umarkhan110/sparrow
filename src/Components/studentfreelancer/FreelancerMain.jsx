import React from 'react'
import ContactUsIcon from '../contactus/ContactUsIcon'
import FreelanceLastSecResp from './FreelanceLastSecResp'
import FreelancerBanner from './FreelancerBanner'
import FreelancerChoose from './FreelancerChoose'
import FreelancerMoney from './FreelancerMoney'
import FreelancerNo from './FreelancerNo'
import FreelancerSignup from './FreelancerSignup'
import FreelancerSimple from './FreelancerSimple'
import FreelancerSupportStudent from './FreelancerSupportStudent'

const FreelancerMain = () => {
  return (
    <div className='freelanceMain'>
      <ContactUsIcon />
      <FreelancerBanner />
      <FreelancerSimple />
      <FreelancerChoose />
      <FreelancerSupportStudent />
      <FreelancerNo />
      <FreelancerSignup />
      <FreelancerMoney />
      <FreelanceLastSecResp />
    </div>
  )
}

export default FreelancerMain