import React from 'react'
import NavBar from './NavBar';
import Footer from './Footer';
import DashboardNav from '../dashboardnavsidebar/DashboardNav';

function Layout({ children }) {
    return (
        <div>
            <DashboardNav />
            {children}
            <Footer />
        </div>
    )
}

export default Layout