import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { verificationAccount } from '../../services/authentication/VerificationNotification'
import LowerCircle from './LowerCircle'
import Swal from 'sweetalert2';
import { useState } from 'react';


const SignupConfirmEmail = () => {
    const [loader, setLoader] = useState(false)
    // vuewing userEmail
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.email)
    // resent verify email
    const resendMail = async () => {
        setLoader(true)
        const resp = await verificationAccount(JSON.parse(localStorage.getItem('sparrowSignIn'))?.token)
        if (resp.status === 200) {
            Swal.fire({
                title: resp.data.message || resp.data.status,
                timer: 1500,
                icon: 'success',
                showConfirmButton: false,
            })
            setLoader(false)
        } else {
            Swal.fire({
                title: resp.data.message || resp.data.status,
                timer: 1500,
                icon: 'error',
                showConfirmButton: false,
            })
            setLoader(false)
        }
    }

    return (
        <>
            <div className='SignupConfirmEmail mb-bg-fb-2 mb-top-pad'>
                <div className='btn-mb-arrow mb-pad-arrow'>
                    <Link to="/signup-student">
                        <img src="./assets/images/whiteBackIcon.svg" />
                    </Link>
                </div>
                <div>
                    <img className='confirmImg confirmImg-1mb' src="/assets/images/createForm/Group 729.svg" alt="" />
                    <img className='confirmImg-mb7' src="/assets/images/Group21373.svg" alt="" />
                </div>
                <div className='innerText'>
                    <h1>Confirm your email</h1>
                    <h6 className='mb-h6-signup'>We sent you a confirmation link to your email: <strong>{user}</strong> <br />
                        Confirm your email to continue your sign up.</h6>
                    <h5>Didn’t receive an email?</h5>
                    {
                        loader ?
                            <div className="relative setForResentEmail">
                                <div className="loader alignLoader"></div>
                                <Link to="" className='resendEmail'>Resend Email</Link>
                            </div>
                            :
                            <Link to="" onClick={resendMail} className='resendEmail'>Resend Email</Link>
                    }
                </div>
            </div>
            <LowerCircle />
        </>
    )
}

export default SignupConfirmEmail