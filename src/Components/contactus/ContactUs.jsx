import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { sendEmail } from '../../services/contactus/ContactUs';
import ContactUsIcon from './ContactUsIcon'

const ContactUs = () => {
    // sendEmail
    const [loder, setLoder] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (fData) => {
        setLoder(true)
        // debugger
        const data = {
            subject: fData.subject,
            email: fData.email,
            first_name: fData.fname,
            last_name: fData.lname,
            msg: fData.message
        }
        const resp = await sendEmail(data);
        if (resp.status === 200) {
            Swal.fire({
                title: resp.data.message,
                timer: 3000,
                icon: 'success',
                showConfirmButton: false,
            })
        } else {
            setLoder(false)
            Swal.fire({
                title: "Error",
                timer: 3000,
                icon: 'error',
                showConfirmButton: false,
            })
        }
    }
    return (

        <div className='contactMain padding-contact logInClass'>
            <ContactUsIcon />
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className='contact-us-mb mb-css-1 mb-css-5 mt100'>
                    <div className='upperForm'>
                    </div>
                    <h2 className='contact-h2-1'>Contact <span className='contact-span'>Us</span></h2>
                    <div className='inner mt-5'>
                        <div className='mb35 d-flex mb-dflex field-contct'>
                            <div className='contact-field-1'>
                                <p className='mb-1 p-contact-mb'>First Name</p>
                                <input style={{ color: "#C4C4C4" }} placeholder='Jonathan' className='nameField mb-namefield' type="text" {...register("fname", { required: true })} />
                                {errors.fname && <span className='eror'>This field is required</span>}
                            </div>
                            <div className='contact-field-2'>
                                <p className='mb-1 p-contact-mb'>Last Name</p>
                                <input style={{ color: "#C4C4C4" }} placeholder='Paul' className='nameField mb-namefield' type="text" {...register("lname", { required: true })} />
                                {errors.lname && <span className='eror'>This field is required</span>}
                            </div>
                        </div>

                        <div className='mb35 d-flex mb-dflex field-contct'>
                            <div className='contact-field-1'>
                                <p className='mb-1 p-contact-mb'>Email Address</p>
                                <input style={{ color: "#C4C4C4" }} placeholder='Jonathan.Paul@Gmail.Com' className='nameField mb-namefield' type="email" {...register("email", { required: true })} />
                                {errors.email && <span className='eror'>This field is required</span>}
                            </div>
                            <div className='contact-field-2'>
                                <p className='mb-1 p-contact-mb'>Subject</p>
                                <input style={{ color: "#C4C4C4" }} placeholder='Your Subject' className='nameField mb-namefield' type="text" {...register("subject", { required: true })} />
                                {errors.subject && <span className='eror'>This field is required</span>}
                            </div>
                        </div>

                        <div className='mb35'>
                            <p className='mb-1 p-contact-mb'>Message</p>
                            <div className='contact-field-3'>
                                <textarea style={{ color: "#C4C4C4" }} placeholder='Your message' className='createFormLInput mb-message-input mb-namefield' type="text" {...register("message", { required: true })} />
                                {errors.message && <span className='eror'>This field is required</span>}
                            </div>
                        </div>
                        <div className='btn-contact-1'>
                            {loder ?
                                <div className="relative">
                                    <div className="loader alignLoader"></div>
                                    <button disabled className='btn-contact-mb'>Submit</button>
                                </div>
                                :
                                // <input type="submit" className='primary forgot' value="Submit" />
                                <button type="submit" className='btn-contact-mb' >Submit</button>
                            }
                        </div>
                    </div>
                </form>
            </div>


        </div>
    )
}

export default ContactUs