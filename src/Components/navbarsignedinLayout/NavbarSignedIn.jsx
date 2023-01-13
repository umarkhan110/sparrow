import React from 'react'
import DashboardNav from '../dashboardnavsidebar/DashboardNav'
import Footer from '../navbarfooter/Footer'

const NavbarSignedIn = ({ children }) => {
    return (
        <div>
            <DashboardNav />
            <div className="navMain5pagesSignedIn" >
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default NavbarSignedIn