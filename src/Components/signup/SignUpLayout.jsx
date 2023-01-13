import React from 'react'
import SignUpNav from './SignUpNav'

const SignUpLayout = ({children}) => {
  return (
    <div className='h-100 d-flex flex-column justify-content-between signUpLayout_theme'>
    {/* <div className='h-100'> */}

        <SignUpNav/>
        {children}
    </div>
  )
}

export default SignUpLayout