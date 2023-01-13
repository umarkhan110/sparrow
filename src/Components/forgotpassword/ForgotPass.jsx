import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LowerCircle from '../signup/LowerCircle'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ForgotPassword } from '../../services/authentication/ForgotPassword';
import Swal from 'sweetalert2';

const ForgotPass = () => {
  const [loder, setLoder] = useState(false)

  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (fData) => {
    setLoder(true)
    const data = {
      email: fData.email
    }

    const resp = await ForgotPassword(data)
    if (resp.status === 200) {
      Swal.fire({
        title: "Email has been sent! Please Check your Inbox",
        timer: 3000,
        icon: 'success',
        showConfirmButton: false,
      })
      setTimeout(() => {
        navigate('/');
      }, 3100);
    } else {
      setLoder(false)
      Swal.fire({
        title: resp.data.message,
        timer: 1500,
        icon: 'error',
        showConfirmButton: false,
      })
    }

  }

  return (
    <>

      <div className='mb-green-arrow'>
        <Link to='/signin'>
          <img src="./assets/images/Vector_backIcon.svg" alt='bo back icon' />
        </Link>
      </div>
      <div className='block-img-mb mb-head-img'>
        <img src="/assets/images/Ellipse 51.png" alt="123" className='sideImageTopRight' />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="SignupConfirmEmail setForgotPassMain mb-frgt-pass">
        <div className='parrot-mb'>
          <img className='parrot-forgt' src="./assets/images/4A4A4A2022-06-08T1224541.png" alt="parrot" />
        </div>
        <h2 className='formHeadStudent mb-24'>Forgot Your Password?</h2>
        <p className='forgt-mb-p mb38' style={{ color: "black" }}>Enter the email address associated with your account <br /> and we’ll send you a link to reset your password. </p>
        <div className='mb35 email-para'>
          <p className='mb-2-frgt mb-2' style={{ color: "black" }}>Email Address</p>
          <div>
            <input type="email" autocomplete="off" style={{ color: "#C4C4C4" }} className='createFormLInput setwidth mb-form-wid' placeholder='Email Address' {...register("email", { required: true })} />
          </div>
          {errors.email && <span className='eror'>This field is required</span>}
        </div>
        <div className='mb-frgt-field'>
          {loder ? <button className='primary forgot' disabled>Forgot Password</button>
            :
            <input type="submit" className='primary forgot' value="Forgot Password" />
          }
        </div>
        <h5 className='backtoLogin login-back'>Back to <Link to="/signin" >log in</Link></h5>
      </form>
      <LowerCircle />
    </>
  )
}

export default ForgotPass