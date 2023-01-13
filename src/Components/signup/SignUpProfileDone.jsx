import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import LowerCircle from './LowerCircle'

const SignUpProfileDone = () => {
    let navigate = useNavigate();

    const removeFunc = () => {
        localStorage.removeItem("stepForms");
        localStorage.removeItem("stepBank");
        setTimeout(() => {
            navigate('/dashboardRoute/student-profile/');
        }, 1000);
    }

    return (
        <>
            <div className='SignupConfirmEmail mb-bg-fb-2 mb-bg7 mb-top-pad'>
                <div className='btn-mb-arrow mb-pad-arrow'>
                    <Link to="/step-three">
                        <img src="./assets/images/whiteBackIcon.svg" alt="" />
                    </Link>
                </div>
                <div>
                    <img className='confirmImg confirmImg-1mb' src="/assets/images/createForm/Verification Screen icon.svg" alt="" />
                    <img className='confirmImg-mb7' src="/assets/images/Group21376.png" alt="" />

                </div>
                <div className='innerText2'>
                    <h1>Your profile is all done! </h1>
                    <h6 className='mb-h6-signup margn-h6-mb'>Thank your for submitting your profile. Our team will review it <br /> and get back to you in 24 hours. </h6>
                    <Link onClick={removeFunc} to='/dashboardRoute/student-profile/' className='primary finishBtn'>Finish</Link>
                </div>
            </div>
            <LowerCircle />
        </>
    )
}

export default SignUpProfileDone