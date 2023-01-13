import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { createNotification } from '../../services/notifications/CreateNotification'
import { sendNotification } from '../../services/notifications/SendNotification'
// import { getSingleOrder } from '../../services/order/GetSingleOrder'
import { updateOrder } from '../../services/order/UpdateOrder'
import { getSingleTask } from '../../services/tasks/GetSingleTask'
import FooterNav from '../mobilefooternav/FooterNav'


const StudentTaskDescp = () => {

    const [btnLoder, setBtnLoder] = useState(false)
    const [loder, setLoder] = useState(true);
    let navigate = useNavigate();
    let { taskId, orderId } = useParams();

    // student user
    let student_id = JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id;
    let student_Name = JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.first_name;

    // get order details data by sending task id 
    const [orderData, setOrderData] = useState([]);
    // console.log(orderData?.task_details?.order_details[0]?.status)
    const getOrderFunc = async () => {
        const response = await getSingleTask(taskId);

        if (response.status === 200) {
            setOrderData(response.data.task);
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

    // cleint token
    const clientToken = orderData?.task_details?.client?.fcm_token;
    // updating order on button click
    const orderUpdate = async (id) => {
        // 0 : pending
        // 1 : unpaid
        // 2 : progress
        // 3 : closed
        // 4 : canceled
        const data = {
            task_id: orderData?.task_details?.id,
            student_id: student_id,
            client_id: orderData?.task_details?.client?.id,
            status: ""
        }
        if (id === 1) {
            data.status = 1
        } else if (id === 3) {
            data.status = 3
        }

        const resp = await updateOrder(data, orderId)

        if (resp.status === 200) {
            // creating notifiaction for All notififcation tab as order is accepted
            if (id === 1) {
                setBtnLoder(true)
                // create notification
                const data = {
                    // as reqirement by backend type is 0
                    type: 0,
                    to_id: orderData?.task_details?.client?.id,
                    from_id: student_id,
                    data: {
                        title: "Order Accepted",
                        message: `Order Accepted by ${student_Name}.Click to proceed`,
                        action_url: `/dashboardRoute/customer-notification/task-details/${taskId}`
                    },
                    read_at: null
                }
                const resp = await createNotification(data)
                // send notification
                const data2 = {
                    fcmToken: clientToken,
                    title: "Order Update",
                    body: `Order accepted by ${student_Name}`
                }
                const resp2 = await sendNotification(data2)
                if (resp.status === 200 && resp2.status === 200) {
                    Swal.fire({
                        title: "Notification sent to the client. Whenever he'll approve the request you can start working on it.",
                        showConfirmButton: true,
                        customClass: "stModal"
                    });
                }
            }
            else
            // if order is canceled simply redirected
            {
                navigate("/dashboardRoute/student-profile/")
            }
        }

    }

    return (
        <div>
            {
                loder ?
                    <div style={{ height: "100vh" }
                    } className="height100vh" >
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
                    <div className='bgNotiLines mb-task-student'>
                        <Container>
                            <h2 className='mb57'>Task   <span className='green'>Description</span></h2>
                            <Row>
                                <Col md={4}>
                                    <div className='studentDetails setStduentDtails'>
                                        <div className='studentDetailsImg mb-3 block'>
                                            <img src={orderData?.task_details?.client?.image} alt="" />
                                        </div>
                                        <h5 className='upH5 mb-3 block'>{orderData?.task_details?.client?.first_name}</h5>
                                        <div className='studentContent ml25'>
                                            <div className='mb-2'>
                                                <img src="/assets/images/customerDashboard/verified-dashboar.svg" alt="" /> &nbsp;&nbsp;
                                                <span className='ml-7'>
                                                    {orderData?.task_details?.client?.email_verified_at ? "Verified" : "Not Verified"}</span>
                                            </div>
                                            <div className='mb-3 block'>
                                                {/* {console.log(orderData?.task_details?.invitedStudents)} */}
                                                <img src="/assets/images/customerDashboard/personsvector.svg" alt="" />&nbsp;&nbsp;
                                                <span className='ml-7'>{orderData?.task_details?.invitedStudents.length > 0 ?
                                                    `${orderData?.task_details?.invitedStudents.length} Invites`
                                                    : "0 Invites"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={8}>
                                    <div className='studentDescription mb-student-desp wd75'>
                                        <div className='hourlyPayDiv mb-2'>
                                            <div>
                                                <img src="/assets/images/customerDashboard/hourlyvector.svg" alt="" />
                                            </div>
                                            <div>
                                                <span>Hourly Pay</span>
                                            </div>
                                            <div>
                                                <p>${orderData?.task_details?.hourly_rate}</p>
                                            </div>
                                        </div>
                                        <div className='studentTaskDescpDiv mb-studnt-descp'>
                                            <Row>
                                                <Col md={5}>
                                                    <div className='studentTaskDescpParts'>
                                                        <div>
                                                            <img src="/assets/images/customerDashboard/vectortask.svg" alt="" />
                                                        </div>
                                                        <div className='ml14'>
                                                            <p className='teaskHHed heading-mb-stud'>Task</p>
                                                            <p className='teaskCtn p-mb-stud'>{orderData?.task_details?.title}</p>
                                                        </div>
                                                    </div>
                                                    <div className='studentTaskDescpParts'>
                                                        <div>
                                                            <img src="/assets/images/customerDashboard/vectorlocation.svg" alt="" />
                                                        </div>
                                                        <div className='ml14'>
                                                            <p className='teaskHHed heading-mb-stud'>Location</p>
                                                            <p className='teaskCtn p-mb-stud'>{orderData?.task_details?.location?.city}</p>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <div className='line'></div>
                                                </Col>
                                                <Col md={5}>
                                                    <div className='studentTaskDescpParts'>
                                                        <div>
                                                            <img src="/assets/images/customerDashboard/Vectordate.svg" alt="" />
                                                        </div>
                                                        <div className='ml14'>
                                                            <p className='teaskHHed heading-mb-stud'>Start Date</p>
                                                            <p className='teaskCtn p-mb-stud'>{orderData?.task_details?.start_date}</p>
                                                        </div>
                                                    </div>
                                                    <div className='studentTaskDescpParts'>
                                                        <div>
                                                            <img src="/assets/images/customerDashboard/vectortime.svg" alt="" />
                                                        </div>
                                                        <div className='ml14 '>
                                                            <p className='teaskHHed heading-mb-stud'>Time</p>
                                                            <p>
                                                                {orderData?.availability?.map((item => {
                                                                    return (<div>
                                                                        <div>{item?.day.charAt(0).toUpperCase() + item?.day.slice(1)}</div>
                                                                        <div>{item.avail[0].start} - {item.avail[0].end}</div>
                                                                    </div>)
                                                                }))
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className='studentTaskDescpDiv mb-studnt-descp'>
                                            <p className='teaskHHed para-mb-stud'>Task Description</p>
                                            <p className='teaskCtn mt-2'>{orderData?.task_details?.description}</p>
                                        </div>
                                        <div className='colorfulBtns'>
                                            {
                                                orderData?.task_details?.order_details[0]?.status === 0 ?
                                                    <>
                                                        <Link onClick={() => { orderUpdate(4) }} to="" className='mainStyle bb2 p-mb-stud'>Decline</Link>
                                                        {btnLoder ?
                                                            <div className="relative inheritt">
                                                                <div className="loader alignLoader"></div>
                                                                <Link to="" className='mainStyle bb3 p-mb-stud'>Accept</Link>
                                                            </div>
                                                            :
                                                            <Link onClick={() => { orderUpdate(1) }} to="" className='mainStyle bb3 p-mb-stud'>Accept</Link>
                                                        }
                                                        {/* <Link onClick={() => { orderUpdate(1) }} to="" className='mainStyle bb3 p-mb-stud'>Accept</Link> */}
                                                    </>
                                                    :
                                                    ""
                                            }
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <div>
                            <FooterNav />
                        </div>
                    </div>
            }
        </div >

    )
}

export default StudentTaskDescp