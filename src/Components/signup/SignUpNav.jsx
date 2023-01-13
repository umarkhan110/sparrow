import React from 'react'
import { Link } from 'react-router-dom'

const SignUpNav = () => {
  return (
    <div className='signUpNav displaynone-mb'>
        <div className='sign-mb-nav'>
            <Link to="/"><img className='img1' src="/assets/images/signUpNav/Group 666.svg" alt="" /></Link>
        </div>
        <div>
            <img src="/assets/images/signUpNav/lowercircle.svg" alt="" />
        </div>
    </div>
  )
}

export default SignUpNav