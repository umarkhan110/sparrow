import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import Swal from 'sweetalert2'
import { getSingleOrder } from '../../services/order/GetSingleOrder'
import FooterNav from '../mobilefooternav/FooterNav'

// for payment
import {
    // CardElement,
    // useStripe,
    // useElements,
} from '@stripe/react-stripe-js';
// import { updateOrder } from '../../services/order/UpdateOrder'

const CustomerOrderDetails = () => {
    let { orderId } = useParams();

    // for payment
    // const stripe = useStripe();
    // const elements = useElements();
    // let client_id = JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id;

    // get order details data
    const [orderData, setOrderData] = useState([]);
    const [loder, setLoder] = useState(true);

    const getOrderFunc = async () => {
        const response = await getSingleOrder(orderId);

        if (response.status === 200) {
            setOrderData(response.data.order);
            setLoder(false);
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
    }, [])

    // console.log(orderData?.order_details?.task_id)
    // calculations for order
    // here ghanaty will be hours in minutes coming from backend || in minMinutesForTask we place hours coming from backend || setTotalTaskHours in useEffect because it was causing infinite loop

    // let orderMinutes;

    // if (orderData?.billing_info?.length > 0) {
    //     if (orderData?.billing_info[0]?.today_hours_billed != null) {
    //         // debugger
    //         let taime = orderData?.billing_info[0]?.today_hours_billed;
    //         let taimeSplit = taime.split(':'); // split it at the colons
    //         orderMinutes = (+taimeSplit[0]) * 60 + (+taimeSplit[1]);
    //     }
    // }

    // let minMinutesForTask = orderMinutes;
    // const [totalTaskHours, setTotalTaskHours] = useState();
    // useEffect(() => {
    //     // debugger
    //     if (minMinutesForTask) {
    //         setTotalTaskHours(minMinutesForTask)
    //     }
    // }, [orderMinutes])

    // hours/minutes func because to show 1:10 format in frontend
    // const [hour, setHour] = useState();
    // const [minutes, setMinutes] = useState();
    // const convertInHoursMinutes = () => {
    //     // debugger
    //     if (totalTaskHours) {
    //         setHour(Math.floor(totalTaskHours / 60));
    //         setMinutes(totalTaskHours % 60);
    //     }
    // }

    // tip value and limit for tip
    // const [tip, setTip] = useState();
    // const limitForTip = event => {
    //     const limit = 3;
    //     setTip(event.target.value.slice(0, limit));
    // };

    // total money func || TOTAL PAYMENT
    // const [amount, setAmount] = useState();

    // const totalMoney = () => {
    //     let defaultPrice = (totalTaskHours / 60 * orderData?.order_details?.task?.hourly_rate + parseInt(tip))
    //     if (isNaN(defaultPrice)) {
    //         setAmount(totalTaskHours / 60 * orderData?.order_details?.task?.hourly_rate)
    //     } else {
    //         setAmount(defaultPrice)
    //     }
    // }

    // useEffect(() => {
    //     convertInHoursMinutes()
    //     totalMoney()
    // }, [totalTaskHours, tip])

    // decrement
    // const decrement = () => {
    //     if (totalTaskHours > minMinutesForTask) {
    //         setTotalTaskHours(totalTaskHours - 30)
    //     } else {
    //         return false
    //     }
    // }
    // increment
    // const increment = () => {
    //     setTotalTaskHours(totalTaskHours + 30)
    // }

    // let imageForMinus = (totalTaskHours <= minMinutesForTask) ? "/assets/images/customerDashboard/minusgroup.svg" : "/assets/images/customerDashboard/minusGreenGroup.svg";

    // after payment is made   || as described by backend 
    // const tipFromBackend = orderData?.order_details?.tip;
    // const hoursFromBackend = orderData?.order_details?.hours_billed;
    // // console.log(orderData?.order_details?.hours_billed)
    // const paymentFunc = async () => {
    //     // 0 => pending, 1 => progress, 2 => closed, 3 => canceled
    //     const data = {
    //         task_id: orderData?.order_details?.id,
    //         student_id: orderData?.order_details?.student_id,
    //         client_id: client_id,
    //         status: "",
    //         tip: null,
    //         hours_billed: null
    //     }
    //     data.tip = tip + tipFromBackend;
    //     data.hours_billed = hour + hoursFromBackend;
    //     const resp = await updateOrder(data)
    //     if (resp.data === 200) {
    //         console.log()
    //     }
    // }
    return (
        <>
            {
                loder ?
                    <div
                        style={{ height: "100vh" }}
                        className="height100vh" >
                        <div className="lds-spinner">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div >
                    :
                    <div className='bgNotiLines'>
                        <Container>
                            <h2 className='text-center alignIt'>Order  <span className='green'>Details</span></h2>
                            <div className='orderContentMain'>
                                <Row>
                                    <Col md={4}>
                                    </Col>
                                    <Col md={6}>
                                        <div className='orderHedg'>
                                            <>
                                                <img src="/assets/images/offer/boxg.svg" alt="" />
                                            </>
                                            <p>Hourly Pay</p>
                                            <>
                                                <button
                                                    style={{ cursor: "unset" }}>
                                                    ${orderData?.order_details?.task?.hourly_rate}
                                                </button>
                                            </>
                                            {/* <><button style={{ cursor: "unset" }}>${}</button></> */}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <div className='studentDetails'>
                                            <h4 className='mb-3'>student Details</h4>
                                            <div className='studentDetailsImg'>
                                                <img src={orderData?.order_details?.student?.image} alt="" />
                                            </div>
                                            <h5 style={{ marginBottom: "10px" }} className='upH5'>{orderData?.order_details?.student?.first_name}   {orderData?.order_details?.student?.first_name}</h5>
                                            {/* <h5 className='belowH5'>Junior </h5> */}
                                            <div className='studentContent'>
                                                <div className='mb-3'>
                                                    <img src="/assets/images/customerDashboard/capvector.svg" alt="" />
                                                    <span className='ml-7'>{orderData?.order_details?.student?.student_details?.college ? orderData?.order_details?.student?.student_details?.college : "Melo College"}</span>
                                                </div>
                                                <div className='mb-3'>
                                                    <img src="/assets/images/customerDashboard/lcoationvector.svg" alt="" />
                                                    <span className='ml-7'>{orderData?.order_details?.student?.student_details?.location?.city ? orderData?.order_details?.student?.student_details?.location?.city : "New York"}</span>
                                                </div>
                                                <div>
                                                    <img src="/assets/images/customerDashboard/verified-dashboar.svg" alt="" />
                                                    <span className='ml-7'>
                                                        {orderData?.order_details?.student?.email_verified_at !== null ? "Verified" : "Not Verified"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className='orderDetailRight'>
                                            <div className='orderfirstBox'>
                                                <div className='orderfirstBoxP'>
                                                    <div>
                                                        <img src="/assets/images/offer/rotateImg.svg" alt="" />
                                                    </div>
                                                    <div>
                                                        <p>Job Type</p>
                                                        <h5>{orderData?.order_details?.task?.type}</h5>
                                                    </div>
                                                </div>
                                                <div className='orderfirstBoxP'>
                                                    <div>
                                                        <img src="/assets/images/customerDashboard/vectortask.svg" alt="" />
                                                    </div>
                                                    <div>
                                                        <p>Task</p>
                                                        <h5>{orderData?.order_details?.task?.title}</h5>
                                                    </div>

                                                </div>
                                                <div className='orderfirstBoxP'>
                                                    <div>
                                                        <img src="/assets/images/customerDashboard/vectorlocation.svg" alt="" />
                                                    </div>
                                                    <div>
                                                        <p>Location</p>
                                                        <h5>{orderData?.order_details?.task?.location?.city}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='orderfirstBox'>
                                                <div className='orderfirstBoxP'>
                                                    <div>
                                                        <img src="/assets/images/customerDashboard/Vectordate.svg" alt="" />
                                                    </div>
                                                    <div>
                                                        <p>Start Date</p>
                                                        <h5>{orderData?.order_details?.task?.start_date}</h5>
                                                    </div>
                                                </div>
                                                <div className='orderfirstBoxP'>
                                                    <div>
                                                        <img src="/assets/images/customerDashboard/vectortime.svg" alt="" />
                                                    </div>
                                                    <div>
                                                        <p>Time</p>
                                                        <h5>
                                                            {orderData?.availability?.map((item => {
                                                                return (<div>
                                                                    <div>{item?.day.charAt(0).toUpperCase() + item?.day.slice(1)}</div>
                                                                    <div>{item.avail[0].start} - {item.avail[0].end}</div>
                                                                </div>)
                                                            }))
                                                            }
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 2nd section */}

                                        <div className='orderDetailRight taskDescriptionClass'>
                                            {/* <div className='orderDetailRight setTsdk'> */}
                                            <p className='ml-1' style={{ color: "#82D051" }}>Task Description</p>
                                            <p className='pd0101'>
                                                {orderData?.order_details?.task?.description}
                                            </p>
                                            {/* </div> */}

                                            {/* <div className='orderfirstBox set2ndBox pd010'>
                                                <div className='orderfirstBoxP'>
                                                    <div>
                                                        <p>Total Hours</p>
                                                        <div className='set2ndBox pd010'>
                                                            <div>
                                                                <span><img onClick={decrement} src={imageForMinus} alt="" /></span>
                                                            </div>
                                                            &nbsp;&nbsp;
                                                            <h5 className='classicalBtn'>
                                                                {hour} : {minutes}
                                                            </h5>
                                                            &nbsp;&nbsp;
                                                            <div>
                                                                <span><img onClick={increment} src="/assets/images/customerDashboard/plusgroup.svg" alt="" /></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='orderfirstBox'>
                                                <div className='orderfirstBoxP addingBrder'>
                                                    <div className='tipInputDiv'>
                                                        <p>Tips</p>
                                                        <input
                                                            value={tip}
                                                            onChange={limitForTip} className='classicalBtn tipInput bx-none' type="number" placeholder='00' />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='orderfirstBox set2ndBox pd010'>
                                                <div className='orderfirstBoxP'>

                                                    <div>
                                                        <p>Total Payment</p>
                                                        <h5 className='classicalBtn'>${amount ? amount : 0}</h5>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>

                                        {/* <CardElement /> */}
                                        {orderData?.order_details?.status === "in progress" ?
                                            <Link
                                                to={`/dashboardRoute/feedback/${orderId}`} className='primary common alignRiht'>
                                                Review Student
                                            </Link>
                                            :
                                            ""
                                        }
                                        
                                        {/* {orderData?.order_details?.status !== "in progress" ?
                                            ""
                                            :
                                            <div className='payBtnDiv'>
                                                <Link to="" className='primary common'>Pay Task</Link>
                                                {
                                                    orderData?.order_details?.task?.type === "Recurring" ?
                                                        <Link className='secondary common' to={`/dashboardRoute/feedback/${orderId}`}>End</Link> : ""
                                                }
                                                <Link className='secondary common' to={`/dashboardRoute/customer-notification/task-details/${orderId}`}>Task Detail</Link>
                                                </div>
                                            } */}
                                        {/* <Link className='secondary common' to={`/dashboardRoute/customer-notification/task-details/${orderData?.order_details?.task_id}`}>Task Detail</Link> */}
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                        <div>
                            <FooterNav />
                        </div>
                    </div>
            }

        </>

    )
}

export default CustomerOrderDetails