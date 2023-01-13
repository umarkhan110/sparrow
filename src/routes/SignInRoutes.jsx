import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AboutMain from '../Components/aboutus/AboutMain'
import ContactUs from '../Components/contactus/ContactUs'
import NavbarSignedIn from '../Components/navbarsignedinLayout/NavbarSignedIn'
import FreelancerMain from '../Components/studentfreelancer/FreelancerMain'
import ViewAllStudents from '../Components/viewallstudents/ViewAllStudents'
import FAQ_detailPage from '../Components/aboutus/faqSubPage/FAQ_detailPage'

import CustomerStudentProfile from '../Components/cutomerdashboard/CustomerStudentProfile';


const SignInRoutes = ({ children }) => {

    return (
        <>
            <Routes>
                <>
                    <Route path="about" element={<NavbarSignedIn><AboutMain /></NavbarSignedIn>} />
                    <Route path="faq" element={<NavbarSignedIn><FAQ_detailPage /></NavbarSignedIn>} />
                    <Route path="student-freelancer" element={<NavbarSignedIn><FreelancerMain /></NavbarSignedIn>} />
                    <Route path="all-students" element={<NavbarSignedIn><ViewAllStudents /></NavbarSignedIn>} />
                    
                    <Route path="all-students/single-student-profile/:userID" element={<NavbarSignedIn><CustomerStudentProfile /></NavbarSignedIn>} />

                    <Route path="contact-us" element={<NavbarSignedIn><ContactUs /></NavbarSignedIn>} />
                </>
            </Routes>
        </>
    )
}

export default SignInRoutes