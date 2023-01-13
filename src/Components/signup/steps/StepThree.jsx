// import React from 'react'
// import { Link } from 'react-router-dom'
// import LowerCircle from '../LowerCircle'
// import Swal from 'sweetalert2';
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { useState } from 'react';
// import { createBankDetails } from '../../../services/bank/CreateBankDetail';
// import { updateBankDetails } from '../../../services/bank/UpdateBankDetail';



// const StepThree = () => {

//     // data to be change
//     const [loader, setLoader] = useState(false)
//     //for navigation
//     let navigate = useNavigate();
//     // handling form
//     const { register, handleSubmit, formState: { errors } } = useForm();


//     const [validCardNumber, setValidCardNumber] = useState('');

//     function cc_format(value) {
//         var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
//         var matches = v.match(/\d{4,16}/g);
//         var match = matches && matches[0] || ''
//         var parts = []
//         for (let i = 0, len = match.length; i < len; i += 4) {
//             parts.push(match.substring(i, i + 4))
//         }
//         if (parts.length) {
//             return parts.join(' ')
//         } else {
//             return value
//         }
//     }

//     // checkDigit change function

//     function checkDigit(event) {
//         const re = /\d+/g;
//         if (!event.target.value || !re.test(event.target.value)) {
//             if (event.target.value.length == 0) {
//                 setValidCardNumber('');
//             }
//             return false;
//         }
//         let valueReturn = cc_format(event.target.value);
//         setValidCardNumber(valueReturn);

//         return true;
//     }


//     const onSubmit = async (fData) => {
//         setLoader(true)
//         const data = {
//             card_holder_name: fData.cardHolderName,
//             card_number: fData.cardNumber.toString().replace(/\s/g, ''),
//             routing_number: fData.routingNumber,
//             user_id: parseInt(fData.userID)
//         }
//         if ((localStorage.getItem('stepBank'))) {
//             const resp = await updateBankDetails(data)
//             const errors = resp?.data?.errors;

//             if (resp.status === 200) {
//                 Swal.fire({
//                     title: resp.data.message,
//                     timer: 1500,
//                     icon: 'success',
//                     showConfirmButton: false,
//                 })
//                 // adding value in local storage so that we can check when user update
//                 setTimeout(() => {
//                     navigate('/signUpRoute/profile-done');
//                 }, 2000);
//             }
//             else {
//                 Swal.fire({
//                     title: resp.data.message,
//                     timer: 3500,
//                     icon: 'error',
//                     showConfirmButton: false,
//                 })
//                 setLoader(false)
//             }
//         }
//         // hit the below api if it is not first time
//         else {
//             const resp = await createBankDetails(data)
//             const errors = resp?.data?.errors;

//             if (resp.status === 200) {
//                 Swal.fire({
//                     title: resp.data.message,
//                     timer: 1500,
//                     icon: 'success',
//                     showConfirmButton: false,
//                 })
//                 // adding alue in local storage so that we can check when user update
//                 localStorage.setItem("stepBank", JSON.stringify("stepBankOne"))
//                 setTimeout(() => {
//                     navigate('/signUpRoute/profile-done');
//                 }, 2000);
//             }
//             else {
//                 Swal.fire({
//                     title: resp.data.message,
//                     timer: 3500,
//                     icon: 'error',
//                     showConfirmButton: false,
//                 })
//                 setLoader(false)
//             }
//         }

//     }

//     let errerrorForCardNumber = '';
//     if (errors.cardNumber) {
//         errerrorForCardNumber = (errors.cardNumber.type == 'pattern') ? <span className='eror'>Not a valid account number.</span> : <span className='eror'>This field is required</span>
//     }

//     // fill out later
//     const handleChange = (e) => {
//         let isChecked = e.target.checked;
//         if (isChecked) {
//             setTimeout(() => {
//                 navigate('/signUpRoute/profile-done');
//             }, 200);
//         }
//     }
//     return (
//         // bank details
//         <>
//             <div className='mb-green-arrow'>
//                 <Link to="/signUpRoute/step-three">
//                     <img src="./assets/images/Vector_backIcon.svg" alt='' />
//                 </Link>
//             </div>
//             <div className='block-img-mb mb-head-img'>
//                 <img src="/assets/images/Ellipse511.png" alt="123" />
//             </div>
//             {/* desktopStep */}
//             <div className='stOneDiv setResonive'>
//                 <img src="/assets/images/offer/stepFourDesktop.svg" alt="" />
//             </div>
//             {/* mobileStep */}
//             <div className='stOneDivResp setResonive1'>
//                 <img src="/assets/images/offer/stepFourMobile.svg" alt="" />
//             </div>
//             <form onSubmit={handleSubmit(onSubmit)} className='bankDetails'>
//                 <input type="hidden" value={JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id} {...register("userID", { required: true })} />

//                 <div className='stepOne'>

//                     <h2>Bank Details</h2>
//                     <div className='mb35'>
//                         <p className='mb-1'>Cardholder Name</p>
//                         <div>
//                             <input style={{ color: "#C4C4C4" }} placeholder='E.g. Jonathan Paul lve' className='createFormLInput' type="text" {...register("cardHolderName", { required: true })} />
//                             {errors.cardHolderName && <span className='eror'>This field is required</span>}
//                         </div>
//                     </div>
//                     <div className='mb35'>
//                         <p className='mb-1'>Card Number</p>
//                         <div>
//                             <input style={{ color: "#C4C4C4" }} placeholder='0000  0000  0000  0000' className='createFormLInput cardd' type="text" value={validCardNumber} {...register("cardNumber", { required: true, pattern: /\d{4,16}/g, onChange: (e) => checkDigit(e) })} />
//                             {errerrorForCardNumber}
//                         </div>
//                     </div>
//                     <div className='mb35'>
//                         <p className='mb-1'>Routing Number</p>
//                         <div>
//                             <input style={{ color: "#C4C4C4" }} placeholder='123456789' className='createFormLInput cardd' type="number" {...register("routingNumber", { required: true })} />
//                             {errors.routingNumber && <span className='eror'>This field is required</span>}
//                         </div>
//                     </div>
//                     <div className='formCheck'>
//                         <div className="pretty p-svg p-curve">
//                             <input onChange={handleChange} type="checkbox" />
//                             <div className="state p-success">
//                                 <svg className="svg svg-icon" viewBox="0 0 20 20">
//                                     <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" ></path>
//                                 </svg>
//                                 <label>Fill out later</label>
//                             </div>
//                         </div>
//                     </div>
//                     <div className='formBtnSet'>
//                         <Link to="/signUpRoute/step-three" className='backBtn mb-backBtn'>Back</Link>
//                         {loader ?
//                             <div className="relative stepLoderAlign">
//                                 <div className="loader alignLoader"></div>
//                                 <input type="submit" className='backBtn ctn pl40' disabled value="Continue" />
//                             </div>
//                             :
//                             <input type="submit" className='backBtn ctn' value="Continue" />
//                         }
//                     </div>
//                 </div>
//             </form>
//             <div className='mt-5'></div>
//             <LowerCircle />
//         </>
//     )
// }

// export default StepThree
