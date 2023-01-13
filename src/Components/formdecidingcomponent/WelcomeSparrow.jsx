import React from 'react'
import { Link } from 'react-router-dom'
import LowerCircle from '../signup/LowerCircle'

const WelcomeSparrow = () => {

    return (
        <>

            <div className='mb-green-arrow'>
                <Link to='/signin'>
                    <img src="./assets/images/Vector_backIcon.svg" alt='' />
                </Link>
            </div>

            <div className='block-img-mb mb-head-img'>
                <img src="/assets/images/Ellipse 51.png" alt="123" />
            </div>
            <div className='welcomeSparrow'>

                <div className='parrot-mb'>
                    <img className='parrot-forgt' src="./assets/images/4A4A4A2022-06-08T1224541.png" alt="parrot" />
                </div>
                <div className='mb-head-1'>
                    <h2 className='formHeadStudent mb23'>Welcome to <span style={{ color: "#82D051" }}>Sparrow</span>
                    </h2>
                    <h5 style={{ color: "#4E4B66", fontFamily: 'Manrope', fontWeight: 600 }}>What are you looking to do?</h5>
                </div>
                <Link to="/signUpRoute/customer-signup" className='welcomeBox mb-2 mt-3 mb-20'>
                    <h6>Family</h6>
                    <h5>Hire and support enthusiastic college students to help you with daily tasks and errands</h5>
                </Link>
                <Link to="/signup-student" className='welcomeBox'>
                    <h6>Student</h6>
                    <h5>Become a student freelancer and connect with local families to help with daily tasks and errands</h5>
                </Link>
                <div className='text-center mt-3'>
                    <h5 style={{ fontFamily: "Manrope", color: "#4E4B66" }}>Already have an account?</h5>
                    <div>
                        <Link to="/signin" className='studentLogIn'>Log In</Link>
                    </div>
                </div>
            </div>
            <LowerCircle />
        </>
    )
}

export default WelcomeSparrow