import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import LowerCircle from '../signup/LowerCircle'
import axios from "../../services/axios";
// import { requestForToken } from '../../firebase/Token';

const Verification = () => {
    let navigate = useNavigate();
    const { id, token } = useParams();
    // checking wherther email is verified
    const isEmailCLickedFunc = () => {
        axios.get(`/verify-email/${id}/${token}`, {
            headers: { Authorization: `Bearer ${(JSON.parse(localStorage.getItem('sparrowSignIn'))?.token)}` }
        }).then((resp) => {
            Swal.fire({
                title: resp.data.message,
                timer: 2000,
                icon: 'success',
                showConfirmButton: false,
            })
            // debugger
            if (JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.role === 'client') {
                // firebase token
                // debugger

                // requestForToken()
                setTimeout(() => {
                    navigate('/dashboardRoute/customer-profile/');
                }, 2500);
            } else if (JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.role === 'student') {
                // firebase token
                // requestForToken()
                setTimeout(() => {
                    navigate('/signUpRoute/step-one');
                }, 2500);
            }
        })
            .catch((error) => {
                // console.error(error)
                Swal.fire({
                    title: error,
                    timer: 1500,
                    icon: 'error',
                    showConfirmButton: false,
                })
                setTimeout(() => {
                    navigate('/signUpRoute/confirm-email');
                }, 2500);
            })
    }
    useEffect(() => {
        isEmailCLickedFunc()
    }, [])

    return (
        <>
            <div className='height100vh'>
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                <h3 style={{ color: 'black' }}>&nbsp;&nbsp;&nbsp;Veryfying....</h3>
            </div>
            <LowerCircle />
        </>
    )
}

export default Verification