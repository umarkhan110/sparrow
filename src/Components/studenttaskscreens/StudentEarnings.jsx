// import React, { useEffect, useState } from 'react'
// import { Col, Container, Row } from 'react-bootstrap'
// import { Link, useNavigate } from 'react-router-dom'
// import Swal from 'sweetalert2';
// import { useForm } from 'react-hook-form';
// import { getBankDetail } from '../../services/bank/GetBankDetail'
// import FooterNav from '../mobilefooternav/FooterNav'
// import { createBankDetails } from '../../services/bank/CreateBankDetail';
// import { updateBankDetails } from '../../services/bank/UpdateBankDetail';

// const StudentEarnings = () => {
//     const [data, setData] = useState([]);
//     const [loder, setLoder] = useState(true);
//     const [validCardNumber, setValidCardNumber] = useState('');
    
//     const [crdHolderName, setCrdHolderName] = useState('');
//     const [routingNumber, setRoutingNumber] = useState('');


//     let navigate = useNavigate();

//     const user_Id = parseInt(JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id);

//     const { register, handleSubmit, formState: { errors } } = useForm();

//     const getFunc = async () => {
//         const response = await getBankDetail(user_Id);

//         if (response.status === 200) {
            
//             setValidCardNumber(data?.card_number)
//             setCrdHolderName(data?.card_holder_name)
//             setRoutingNumber(data?.routing_number)
//             setData(response.data.bank);
//             setLoder(false);
            
//         } else {
//             // Swal.fire({
//             //     title: response.data.message,
//             //     timer: 1500,
//             //     icon: "error",
//             //     showConfirmButton: false,
//             // });
//             setValidCardNumber('')
//             setCrdHolderName('')
//             setRoutingNumber('')
//             setData('');
//             setLoder(false);
//         }
//     };

//     useEffect(() => {
//         getFunc()
        
//     }, [loder])

//     const handleCardHolderValue = (e) =>{
//         setCrdHolderName(e.target.value)
//     }
//     const handleRoutingNumberValue = (e) =>{
//         setRoutingNumber(e.target.value)
//     }

//     const cc_format = (value) => {
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

//     const checkDigit = (event) => {
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

//     let errerrorForCardNumber = '';
//     if (errors.cardNumber) {
//         errerrorForCardNumber = (errors.cardNumber.type == 'pattern') ? <span className='eror'>Not a valid account number.</span> : <span className='eror'>This field is required</span>
//     }

//     const onSubmit = async (fData) => {
//         // setLoader(true)
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
//                     // navigate('/signUpRoute/profile-done');
//                     setLoder(false);
//                 }, 2000);
//             }
//             else {
//                 Swal.fire({
//                     title: resp.data.message,
//                     timer: 3500,
//                     icon: 'error',
//                     showConfirmButton: false,
//                 })
//                 // setLoader(false)
                
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
//                     setLoder(false);
//                 }, 2000);
//             }
//             else {
//                 Swal.fire({
//                     title: resp.data.message,
//                     timer: 3500,
//                     icon: 'error',
//                     showConfirmButton: false,
//                 })
//                 // setLoader(false)
//             }
//         }

//     }



//     return (
//         <div className='setingEarningBg pad-mb-earn'>
//             <Container>

//                 <h2 className='text-center mb-4'>My <span className='green'>Earnings</span></h2>
//                 <div className='orderDetailRight'>
//                     <div className='orderfirstBox'>
//                         <h6 className='earningsh6 mb-earning-tit'>Net Income</h6>
//                         <p className='earningsP mb-earning-title'>$9,032</p>
//                     </div>
//                     <div className='orderfirstBox bRight'>
//                         <h6 className='earningsh6 mb-earning-tit'>Total Tasks</h6>
//                         <p className='earningsP mb-earning-title'>142</p>
//                     </div>
//                     <div className='orderfirstBox'>
//                         <h6 className='earningsh6 mb-earning-tit'>Next earning</h6>
//                         <p className='earningsP mb-earning-title'>$200</p>
//                     </div>
//                 </div>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <input type="hidden" value={JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id} {...register("userID", { required: true })} />
//                         <div className='setEarningSec'>
//                             <h3 className='earningHed'>Bank Details</h3>
//                             <Row>
//                                 <Col md={5}>
//                                     <div className='mb24'>
//                                         <p className='mb-3 tasksHed mb-heading-earn'>Cardholder Name</p>
//                                         <div>
//                                             <input style={{ color: "#C4C4C4" }} placeholder='E.g. Jonathan Paul lve' className='createFormLInput' type="text" value={crdHolderName} {...register("cardHolderName", { required: true , value:crdHolderName , onChange: (e) => handleCardHolderValue(e)})} />
//                                             {errors.cardHolderName && <span className='eror'>This field is required</span>}
//                                             {/* <p className='taskField mb-task-earn'>{data?.card_holder_name}</p> */}
//                                         </div>
//                                     </div>
//                                     <div className='mb24'>
//                                         <p className='mb-3 tasksHed mb-heading-earn'>Routing Number</p>
//                                         <div>
//                                             <input style={{ color: "#C4C4C4" }} placeholder='123456789' className='createFormLInput cardd' type="number" value={routingNumber} {...register("routingNumber", { required: true,value:routingNumber , onChange: (e) => handleRoutingNumberValue(e)  })} />
//                                             {errors.routingNumber && <span className='eror'>This field is required</span>}
//                                             {/* <p className='taskField bgCard mb-task-earn'>{data?.routing_number}</p> */}
//                                         </div>
//                                     </div>
//                                 </Col>
//                                 <Col md={2}></Col>
//                                 <Col md={5}>
//                                     <div className='mb24'>
//                                         <p className='mb-3 tasksHed mb-heading-earn'>Card Number</p>
//                                         <div>
//                                             <input style={{ color: "#C4C4C4" }} placeholder='0000  0000  0000  0000' className='createFormLInput cardd' type="text" value={validCardNumber && cc_format(validCardNumber)} {...register("cardNumber", { required: true , value:(validCardNumber && cc_format(validCardNumber)) , pattern: /\d{4,16}/g, onChange: (e) => checkDigit(e) })} />
//                                             {errerrorForCardNumber}
//                                             {/* <p className='taskField bgCard mb-task-earn'>{data?.card_number}</p> */}
//                                         </div>
//                                     </div>
//                                     <div className='mb24'>
//                                         {/* <Link className='primary createTaskBtn setEarnBtn mb-earnbtn' to="">Save</Link> */}
//                                         <input className='primary createTaskBtn setEarnBtn mb-earnbtn' value="Save" type="submit" />

//                                     </div>
//                                 </Col>
//                             </Row>
//                     </div>
//                 </form>
//             </Container>
//             <div>
//                 <FooterNav />
//             </div>
//         </div>
//     )
// }

// export default StudentEarnings