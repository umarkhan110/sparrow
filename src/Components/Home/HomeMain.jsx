import React from 'react'
import HomeBanner from './HomeBanner'
import HomeStudentProfile from './HomeStudentProfile'
import HomeTasks from './HomeTasks'
import HomeSupportStudent from './HomeSupportStudent'
import HomeHireStudent from './HomeHireStudent'
import HomeHappyUsers from './HomeHappyUsers'
import HomeFindStudent from './HomeFindStudent'
import HomeFingerPrintsLatest from './HomeFingerPrintsLatest'
import ContactUsIcon from '../contactus/ContactUsIcon'
import RealCollege from './RealCollege'

function HomeMain() {
  return (
    <div>
      <ContactUsIcon />
      <HomeBanner />
      <HomeStudentProfile />
      <RealCollege />
      <HomeTasks />
      <HomeSupportStudent />
      <HomeHireStudent />
      <HomeFingerPrintsLatest />
      <HomeHappyUsers />
      <HomeFindStudent />
    </div>
  )
}

export default HomeMain