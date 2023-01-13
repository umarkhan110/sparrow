import React from 'react'
import StudentNav from './StudentNav'
import StudentSideBar from './StudentSideBar'

const StudentLayout = ({ children }) => {
    return (
        <div>
            <StudentNav />
            <StudentSideBar />
            {children}
        </div>
    )
}

export default StudentLayout