import React from 'react'
import DashboardNav from './DashboardNav'
import Sidebar from './SideBar'

const DashboardNoFooter = ({ children }) => {
    return (
        <div>
            <DashboardNav />
            <Sidebar />
            {children}
        </div>
    )
}

export default DashboardNoFooter