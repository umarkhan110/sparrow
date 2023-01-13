import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUpLayout from '../Components/signup/SignUpLayout'
import SignupConfirmEmail from '../Components/signup/SignupConfirmEmail'
import SignUpProfileDone from '../Components/signup/SignUpProfileDone'
import ForgotPass from '../Components/forgotpassword/ForgotPass'
import WelcomeSparrow from '../Components/formdecidingcomponent/WelcomeSparrow'
import CreateAccount from '../Components/signup/CreateAccount'
import StepOne from '../Components/signup/steps/StepOne'
import StepTwo from '../Components/signup/steps/StepTwo'
// import StepThree from '../Components/signup/steps/StepThree'
import Verification from '../Components/verification/Verification'
import PrivateRouteStudent from '../Components/privateroutes/PrivateRouteStudent'
import CustomerSignUp from '../Components/customerforms/CustomerSignup'


const SignUpRoutes = ({ children }) => {

    return (
        <>
            <Routes>
                {/* Loader Page which will be shown us after email is sent */}
                <Route path="verification/:id/:token" element={<SignUpLayout><Verification /></SignUpLayout>} />

                <Route path="confirm-email" element={<SignUpLayout><SignupConfirmEmail /></SignUpLayout>} />
                <Route path="profile-done" element={<SignUpLayout><SignUpProfileDone /></SignUpLayout>} />
                <Route path="forgot" element={<SignUpLayout><ForgotPass /></SignUpLayout>} />
                {/* form decinding componet */}
                <Route path="welcome-to-sparrow" element={<SignUpLayout><WelcomeSparrow /></SignUpLayout>} />
                {/* <Route path="/form" element={<SignUpLayout><SignUpForm/></SignUpLayout>} /> */}
                <Route path="step-one" element={<PrivateRouteStudent><SignUpLayout><CreateAccount /></SignUpLayout></PrivateRouteStudent>} />
                <Route path="step-two" element={<PrivateRouteStudent><SignUpLayout><StepOne /></SignUpLayout></PrivateRouteStudent>} />
                <Route path="step-three" element={<PrivateRouteStudent><SignUpLayout><StepTwo /></SignUpLayout></PrivateRouteStudent>} />
                {/* <Route path="step-four" element={<PrivateRouteStudent><SignUpLayout><StepThree /></SignUpLayout></PrivateRouteStudent>} /> */}
                {/* customer forms */}
                <Route path="customer-signup" element={<SignUpLayout><CustomerSignUp /></SignUpLayout>} />
            </Routes>
        </>
    )
}

export default SignUpRoutes