import React, { useState } from 'react';
import StepFour from './steps/StepFour';
import StepOne from './steps/StepOne';
import StepThree from './steps/StepThree';
import StepTwo from './steps/StepTwo';
import Stepper from 'react-stepper-horizontal';

const SignUpForm = () => {

    // const [value] = React.useContext(FormContext);
    const [currentPage, setCurrentPage] = useState(1);


    return (
        <div className='signUpForm'>
            {/* <Stepper
                steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]}
                activeStep={1}
            /> */}
            {/* <StepWizard> */}
                <StepOne />
                <StepTwo />
                <StepThree />
                <StepFour />
            {/* </StepWizard> */}
        </div>

    )
}

export default SignUpForm