import React, { useState } from 'react'
import "./modalStyle.css";
// import {
//     CardNumberElement,
//     CardExpiryElement,
//     CardCvcElement,
//     useStripe,
//     useElements
// } from "@stripe/react-stripe-js";
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { createPayment } from '../../services/paymentinvites/Payment';
import Swal from 'sweetalert2';
import { updateOrder } from '../../services/order/UpdateOrder';
import { useEffect } from 'react';
import { getSingleTask } from '../../services/tasks/GetSingleTask';
// import { sendNotification } from '../../services/notifications/SendNotification';
import { createNotification } from '../../services/notifications/CreateNotification';
import { createChatRoom } from '../cutomerdashboard/customerinvitecards/CreatingChatRoom';
import { updatePurchaseInvities } from '../../services/paymentinvites/TaskAvailableInvites';


const BankDetailModal = () => {
    // this is payment modal
    const { invites, taskId, paymentFor } = useParams();
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [loader, setLoader] = useState(false)
    // closing Modal
    const [bankShow, setBankShow] = useState(true);
    const handleClose = () => setBankShow(false);
    const CARD_ELEMENT_STYLES = {
        style: {
            base: {
                color: "#C4C4C4",
                fontSize: "15px",
                "::placeholder": {
                    color: "#aab7c4",
                },
            },

        },
    };

    // geeting task id to create update and notification API's
    // get order details data
    const [data1, setData1] = useState([]);
    // const [loder, setLoder] = useState(true);
    // console.log(data1?.task_details?.order_details[0]?.id);
    // getting order
    const getOrderFunc = async () => {
        const response = await getSingleTask(taskId);
        if (response.status === 200) {
            setData1(response.data.task);
            // setLoder(false);
        } else {
            Swal.fire({
                title: response.data.message,
                timer: 1500,
                icon: "error",
                showConfirmButton: false,
            });
        }
    };
    useEffect(() => {
        getOrderFunc()
        // if (!loder) {
        // calculateConnects()
        // }
    }, [])
    // console.log(typeof name);


    // slicing Funct...s
    const [sliceNo, setSliceNo] = useState("")
    const sliceNum = (e) => {
        let limit = 16;
        let b = e.target.value.slice(0, limit);
        setSliceNo(b)
    }
    const [sliceCVC, setSliceCVC] = useState("")
    const sliceCVCFunc = (e) => {
        let limit = 4;
        let b = e.target.value.slice(0, limit);
        setSliceCVC(b)
    }
    // limit month between 1-12
    const [monthValue, setMonthValue] = useState('')
    const limitizeMonth = (event, pattern) => {
        if (event.target.value.length == 0) {
            setMonthValue('');
        } else {
            let valueTest = pattern.exec(event.target.value);
            // console.log('value: ', valueTest.index);
            if (valueTest.index == 0) {
                setMonthValue(event.target.value);
            }
        }
    }

    const [sliceYear, setSliceYear] = useState("")
    const sliceYearFunc = (e) => {
        let limit = 4;
        let b = e.target.value.slice(0, limit);
        setSliceYear(b)
    }

    // console.log(data1?.task_details?.available_invites?.id);

    // after payment button is clicked onSubmit
    const orderId = data1?.task_details?.order_details[0]?.id
    const studentId = data1?.task_details?.order_accepted_by[0]?.id
    const clientId = data1?.task_details?.client?.id
    const orderTitle = data1?.task_details?.title
    const taskInvitiesApi = data1?.task_details?.available_invites?.invites
    // const taskInvitiesId = data1?.task_details?.available_invites?.id

    // console.log(orderName);
    // paymentFor: 0 means payment for order and 1 or else means payment for purchasing connects
    const onSubmit = async (fData) => {
        // debugger
        setLoader(true)
        // invites are fixed here 5 as asked by backend
        const data = {
            name: data1?.task_details?.client?.first_name,
            card_no: fData.no,
            exp_month: fData.month,
            exp_year: fData.year,
            cvc: fData.cvc,
        }
        if (paymentFor === "0") {
            data.invites = 10
            // now payment for order

            const resp = await createPayment(data)
            if (resp.status === 200) {
                // 0 : pending
                // 1 : unpaid
                // 2 : progress
                // 3 : closed
                // 4 : canceled
                const data = {
                    task_id: taskId,
                    student_id: studentId,
                    client_id: clientId,
                    status: 2
                }
                const resp = await updateOrder(data, orderId)
                // if status has been updated so notifications
                if (resp.status === 200) {
                    // const data = {
                    //     // fcmToken: studentData?.fcm_token,
                    //     title: "Order Started.Please Continue Chat",
                    //     body: "Order Recieved from Sparrow"
                    // }
                    // const resp = await sendNotification(data)

                    // creating chatRoom here
                    let std_String = studentId.toString()
                    let client_String = clientId.toString()
                    await createChatRoom(std_String, client_String, taskId, orderId)

                    // creating notifiaction for All notififcation tab
                    const dataN = {
                        // as reqirement by backend type is 0
                        type: 0,
                        to_id: studentId,
                        from_id: clientId,
                        data: {
                            title: "Order Started",
                            message: `Congratulations the order ${orderTitle} has been started.You can now start your chat with Customer.`, action_url: `/dashboardRoute/chatStudent/student-task-descp/${taskId}/${orderId}`
                        },
                        read_at: null
                    }
                    const resp = await createNotification(dataN)
                    if (resp.status === 200) {
                        Swal.fire({
                            title: "Payment is successful.Congratulations order is started!",
                            timer: 3000,
                            icon: 'success',
                            showConfirmButton: false,
                        })
                        setTimeout(() => {
                            navigate('/dashboardRoute/chatStudent')
                        }, 100);
                    }
                }
            } else {
                setLoader(false)
                Swal.fire({
                    title: resp.data.message,
                    timer: 3000,
                    icon: 'error',
                    showConfirmButton: false,
                })
            }
        } else {
            // now payment for connects
            data.invites = parseInt(invites)
            const resp = await createPayment(data)
            // taskInvitiesApi meh hamesha 5 hi arye hongy phr 5 likh skty
            if (resp.status === 200) {
                const data = {
                    task_id: parseInt(taskId),
                    invites: taskInvitiesApi + parseInt(invites)
                }
                const resp1 = await updatePurchaseInvities(parseInt(taskId), data)

                Swal.fire({
                    title: "Congratulations,You have Purchased Connects",
                    timer: 2500,
                    icon: 'success',
                    showConfirmButton: false,
                })
                setTimeout(() => {
                    navigate(`/dashboardRoute/customer-notification/task-details/${taskId}`)
                }, 3000);
            } else {
                setLoader(false)
                Swal.fire({
                    title: resp.data.message,
                    timer: 3000,
                    icon: 'error',
                    showConfirmButton: false,
                })
            }
        }
    }

    return (
        <Modal className='removeDefaultModl' centered show={bankShow} onHide={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)} className='bankModalView'>
                <h4>Bank Details</h4>
                <div className='mb35' style={{ marginTop: "24px" }}>
                    <label htmlFor="cc-number" className='p'>Card Number</label>
                    <input
                        id="cc-number"
                        className="form-control createFormLInput carddd"
                        options={CARD_ELEMENT_STYLES}
                        placeholder="1234123412341234"
                        type="number"
                        {...register("no", { required: true })}
                        onChange={(e) => sliceNum(e)}
                        value={sliceNo}
                    />
                    {errors.no && <span className='eror'>This field is required</span>}
                </div>
                <div className='mb35'>
                    <label htmlFor="expiry" className='p'>Expiry Month</label>
                    <input
                        id="expiry"
                        className="form-control createFormLInput"
                        options={CARD_ELEMENT_STYLES}
                        placeholder="11"
                        type="number"
                        {...register("month", { required: true, min: 1, max: 12, maxLength: 2, onChange: (e) => limitizeMonth(e, /(0?[1-9]|1[012])$/) })}
                        value={monthValue}
                    />
                    {/* <input type="text" pattern={/^ (?: 1[0 - 2] | [1 - 9])$/} /> */}
                    {errors.month && <span className='eror'>This field is required</span>}
                </div>
                <div className='mb35'>
                    <label htmlFor="expiry" className='p'>Expiry Year</label>
                    <input
                        id="expiry"
                        className="form-control createFormLInput"
                        options={CARD_ELEMENT_STYLES}
                        placeholder="2000"
                        type="number"
                        {...register("year", { required: true })}
                        onChange={(e) => sliceYearFunc(e)}
                        value={sliceYear}
                    />
                    {errors.year && <span className='eror'>This field is required</span>}
                </div>
                <div className='mb35'>
                    <label htmlFor="cvc" className='p'>CVC</label>
                    <input
                        id="cvc"
                        className="form-control createFormLInput carddd"
                        options={CARD_ELEMENT_STYLES}
                        type="number"
                        {...register("cvc", { required: true })}
                        onChange={(e) => sliceCVCFunc(e)}
                        value={sliceCVC}
                    />
                    {errors.cvc && <span className='eror'>This field is required</span>}
                </div>
                {loader ?
                    <div className="relative paymentLod">
                        <div className="loader alignLoader"></div>
                        <button disabled className='modelButtn' >Continue</button>
                    </div>
                    :
                    <button className='modelButtn' type="submit">Continue</button>
                }
            </form>
        </Modal>
    )
}

export default BankDetailModal