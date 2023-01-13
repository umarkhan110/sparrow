import React from 'react'
import { Link } from 'react-router-dom'

const MyStudentsHeading = (props) => {
    let mainTypeHiredClass = 'myStudentsBtn'
    let mainTypeSavedClass = 'myStudentsBtn'

    if (props?.prevHierd == 1) {
        mainTypeHiredClass += ' primary mr0';
        mainTypeSavedClass += ' secondary';
    } else {
        mainTypeHiredClass += ' secondary mr0';
        mainTypeSavedClass += ' primary';
    }

    return (
        <div>
            <h2 className='mt140'>My <span className='green'>Students</span></h2>
            <div className='myStudentsBtnMain'>
                <Link to="/dashboardRoute/my-students" className={mainTypeSavedClass}>Saved Students</Link>
                <Link to="/dashboardRoute/my-students/previous-students" className={mainTypeHiredClass}>Previously Hired</Link>
            </div>
        </div>
    )
}

export default MyStudentsHeading