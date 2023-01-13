import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FooterNav from '../mobilefooternav/FooterNav'
import { Rating } from 'react-simple-star-rating'
import { createFeedback } from '../../services/feedback/CreateFeedback'
import Swal from 'sweetalert2'
import { getSingleOrder } from '../../services/order/GetSingleOrder'
import { createNotification } from '../../services/notifications/CreateNotification'
// import { sendNotification } from '../../services/notifications/SendNotification'

const CustomerFeedback = () => {
    const { orderId } = useParams();
    let client_Name = JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.first_name;
    const [btnLoder, setBtnLoder] = useState(false)
    const [skipBtnLoder, setSkipBtnLoder] = useState(false)
    let navigate = useNavigate();

    // rating work
    const [rating, setRating] = useState({
        performance: 0,
        responsibility: 0,
        communication: 0,
        attitude: 0

    }) // initial rating value
    const handleRating = (rate, data) => {
        let setingRate = rate / 20
        if (data === "perform") {
            rating.performance = setingRate
        } else if (data === "response") {
            rating.responsibility = setingRate
        }
        else if (data === "commun") {
            rating.communication = setingRate
        }
        else if (data === "att") {
            rating.attitude = setingRate
        }
    }

    // geting order details here to get student id so we cam pass it customerstudentprofile
    // get order details data
    const [orderData, setOrderData] = useState([]);
    const getOrderFunc = async () => {
        const response = await getSingleOrder(orderId);

        if (response.status === 200) {
            setOrderData(response.data.order);
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

    // console.log(orderData?.order_details?.task?.title);
    // here userID is studentID
    const userID = orderData?.order_details?.student_id;
    const userToken = orderData?.order_details?.student?.fcm_token
    const taskTitle = orderData?.order_details?.task?.title
    // clientId
    const clientId = orderData?.order_details?.client?.id;
    const taskId = orderData?.order_details?.task_id;
    // console.log(orderData?.order_details?.student?.fcm_token)
    //  hittng feedback api
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (fData) => {
        setBtnLoder(true)
        const data = {
            order_id: orderId,
            comment: fData.descp,
            performance: rating.performance,
            responsibility: rating.responsibility,
            communication: rating.communication,
            attitude: rating.attitude
        }

        const resp = await createFeedback(data);
        if (resp.status === 200) {
            Swal.fire({
                title: resp.data.message,
                timer: 1500,
                icon: 'success',
                showConfirmButton: false,
            })
            // creating notification
            const data = {
                // as reqirement by backend type is 0 || userID is studentID
                type: 0,
                to_id: userID,
                from_id: clientId,
                data: { title: "Order Closed", message: `The order of ${taskTitle} is closed by ${client_Name}`, action_url: `/dashboardRoute/chatStudent/student-task-descp/${taskId}/${orderId}` },
                read_at: null
            }
            const resp3 = await createNotification(data)
            // notification || userToken mean student token
            // const data2 = {
            //     fcmToken: userToken,
            //     title: "Order Updated",
            //     body: "Order Updated in Sparrow"
            // }
            // const resp2 = await sendNotification(data2)
            if (resp3.status === 200) {
                setTimeout(() => {
                    navigate(`/dashboardRoute/all-students/customer-student-profile/${userID}`);
                }, 200);
            }

        } else {
            Swal.fire({
                title: resp.data.message,
                timer: 2000,
                icon: 'error',
                showConfirmButton: false,
            })
            setBtnLoder(false)
        }

    }

    // skeip 
    const skipfeedBackApi = async () => {
        setSkipBtnLoder(true)
        const data = {
            order_id: orderId,
            comment: "",
            performance: "",
            responsibility: "",
            communication: "",
            attitude: ""
        }

        const resp = await createFeedback(data);
        if (resp.status === 200) {
            Swal.fire({
                title: resp.data.message,
                timer: 1500,
                icon: 'success',
                showConfirmButton: false,
            })
            // creating notification
            const data = {
                // as reqirement by backend type is 0 || userID is studentID
                type: 0,
                to_id: userID,
                from_id: clientId,
                data: { title: "Order Closed", message: `The order of ${taskTitle} is closed by ${client_Name}`, action_url: `/dashboardRoute/chatStudent/student-task-descp/${taskId}/${orderId}` },
                read_at: null
            }
            const resp3 = await createNotification(data)
            // notification || userToken mean student token
            // const data2 = {
            //     fcmToken: userToken,
            //     title: "Order Updated",
            //     body: "Order Updated in Sparrow"
            // }
            // const resp2 = await sendNotification(data2)

            // if (resp3.status === 200 && resp2.status === 200) {
            if (resp3.status === 200) {
                setTimeout(() => {
                    navigate(`/dashboardRoute/all-students/customer-student-profile/${userID}`);
                }, 200);
            }

        } else {
            setSkipBtnLoder(false)
            Swal.fire({
                title: resp.data.message,
                timer: 2000,
                icon: 'error',
                showConfirmButton: false,
            })
        }
    }

    return (
        <div className='stepOne bgNotiLines'>
            <form className='bankDetails' onSubmit={handleSubmit(onSubmit)}>
                <h2>Give <span className='green'>Feedback</span></h2>
                <div className='mb-42'>
                    <h4 className='mb-1'>Comment</h4>
                    <h5 className='mb-2'>Please share your experience with the student</h5>
                    <textarea placeholder='Describe the student’s performance' className='feedbackField' {...register("descp", { required: true })} />
                    {errors.descp && <span className='eror'>This field is required</span>}
                </div>
                <div className='mb-42'>
                    <h4 className='mb-1'>Rating</h4>
                    <h5 className='mb-2'>Please rate the student’s overall performance </h5>
                    <Row className='ratingBox'>
                        <Col xs={6} className="px-0">
                            <div className='ratingH6Wrap'>
                                <h6>Performance</h6>
                                <h6>Responsibility</h6>
                                <h6>Communication</h6>
                                <h6>Attitude</h6>
                            </div>
                        </Col>

                        <Col xs={6}>
                            <div className='ratingStarss'>
                                <Rating className='starSizeSet' onClick={(e) => handleRating(e, "perform")} ratingValue={rating?.performance} />
                            </div>
                            <div className='ratingStarss'>
                                <Rating className='starSizeSet' onClick={(e) => handleRating(e, "response")} ratingValue={rating?.responsibility} />
                            </div>
                            <div className='ratingStarss'>
                                <Rating className='starSizeSet' onClick={(e) => handleRating(e, "commun")} ratingValue={rating?.communication} />
                            </div>
                            <div className='ratingStarss'>
                                <Rating className='starSizeSet' onClick={(e) => handleRating(e, "att")} ratingValue={rating?.attitude} />
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className='formBtnSet justifyRight'>
                    {skipBtnLoder ?
                        <div className="relative setFeedbacklod">
                            <div className="loader alignLoader"></div>
                            <Link className='secondary feedabckBtn mr-9'>Skip</Link>
                        </div>
                        :
                        <Link onClick={skipfeedBackApi} className='secondary feedabckBtn mr-9'>Skip</Link>
                    }
                    {btnLoder ?
                        <div className="relative setFeedbacklod">
                            <div className="loader alignLoader"></div>
                            <input value="Submit" className='primary feedabckBtn' />
                        </div>
                        :
                        <input type="submit" className='primary feedabckBtn' />
                    }

                </div>
            </form>
            <div>
                <FooterNav />
            </div>
        </div>
    )
}

export default CustomerFeedback