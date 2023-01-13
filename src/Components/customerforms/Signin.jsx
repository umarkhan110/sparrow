import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import { login } from '../../services/authentication/Login';
import { useNavigate } from "react-router-dom";
import LowerCircle from '../signup/LowerCircle';
import { requestForToken } from "../../firebase/Token";

const SignIn = () => {


    let navigate = useNavigate();
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        // check the user is logged in then donot show login screen by back button

        if (localStorage.getItem("sparrowSignIn")) {
            let getLocalUserData = JSON.parse(localStorage.getItem("sparrowSignIn"))
            // console.log(getLocalUserData?.user?.role)
            if (getLocalUserData?.user?.role == "client") {
                navigate('/dashboardRoute/customer-profile/');
            } else if (getLocalUserData?.user?.role == "student") {
                navigate('/dashboardRoute/student-profile/');
            }
        }
    }, []);


    // submiting data
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (fData) => {

        setLoader(true)
        const data = {
            email: fData.email,
            password: fData.pass
        }
        const resp = await login(data);
        if (resp.status !== 200) {
            let errorResp = resp?.data?.message;
            if (resp?.data?.message === "Credientials Not Matched!") {
                errorResp = 'Email or Password didn\'t matched!'
            }

            Swal.fire({
                title: errorResp,
                timer: 1500,
                icon: 'error',
                showConfirmButton: false,
            })
            setLoader(false)
        }
        else if (resp?.data?.user?.role === "client") {
            localStorage.setItem("sparrowSignIn", JSON.stringify(resp.data));
            // firebase token
            requestForToken()
            // navigating to customer page
            navigate('/dashboardRoute/customer-profile/');
            // refreshing as useContxt get new user notifications data
            // window.location.reload();

        } else if (resp?.data?.user?.role === "student") {
            localStorage.setItem("sparrowSignIn", JSON.stringify(resp.data));
            // firebase token
            requestForToken()
            // navigating to student  page
            navigate('/dashboardRoute/student-profile/');
            // refreshing as useContxt get new user notifications data
            // window.location.reload();
        } else {
            Swal.fire({
                title: "Please Login as a Customer or Student",
                timer: 3000,
                icon: 'error',
                showConfirmButton: false,
            })
            setLoader(false)
        }
    }

    return (
        <>
            <div className='signUpStudent customerSignin mbb-signin'>
                <div className='mb-green-arrow'>
                    <Link to="/">
                        <img src="./assets/images/Vector_backIcon.svg" alt='' />
                    </Link>
                </div>

                <div className='block-img-mb'>
                    <img src="/assets/images/Ellipse 51.png" alt="123" />
                </div>
                <div className='signUpStudentAlignment'>
                    <form onSubmit={handleSubmit(onSubmit)} className='signUpStudentForm mb-sign-form'>
                        <div className='parrot-mb'>
                            <img className='parrot-forgt' src="./assets/images/4A4A4A2022-06-08T1224541.png" alt="parrot" />
                        </div>
                        <h2 className='head-sign-mb setResonive1'>Sign in</h2>
                        <div className='mbcustomerSigninP mb-2'>
                            <p style={{ color: "black" }} className='mb-1 mb-pad-space'>Email Address</p>
                            <div>
                                <input placeholder='Email Address' className='createFormLInput' type="email" {...register("email", { required: true })} />
                                {errors.email && <span className='eror'>This field is required</span>}
                            </div>
                        </div>
                        <div className='mb35 customerSigninP mb-space'>
                            <p style={{ color: "black" }} className='mb-1 mb-pad-space'>Password</p>
                            <div>
                                <input placeholder='Password' className='createFormLInput forgot-mb-pass' type="password" {...register("pass", { required: true })} />
                                {errors.pass && <span className='eror'>This field is required</span>}
                            </div>
                            <Link to="/signUpRoute/forgot" className='setCusomerForgot'>Forgot Password ?</Link>
                        </div>
                        <div className='gnder mb-create-acc mb0'>
                            {loader ?
                                <div className="relative">
                                    <div className="loader alignLoader"></div>
                                    <input className='primary fnt18only' type="button" value='Log In' />
                                </div>
                                :
                                <input className='primary fnt18only' type="submit" value='Log In' />
                            }
                            <div className='cennre'>
                                <p className='noAccount' to="">Don’t have an account?</p>
                            </div>
                            <div className='cennre'>
                                <Link className='createAccount' to="/signUpRoute/welcome-to-sparrow">Create an account</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <LowerCircle />
        </>
    )
}

export default SignIn