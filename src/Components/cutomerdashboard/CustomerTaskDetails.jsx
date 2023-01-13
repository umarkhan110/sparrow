import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router'
import Swal from 'sweetalert2'
import FooterNav from '../mobilefooternav/FooterNav'
import { getSingleTask } from '../../services/tasks/GetSingleTask'
import AddConnectsModal from '../modals/AddConnectsModal'

const CustomerTaskDetails = () => {
    let { taskId } = useParams();
    let navigate = useNavigate();

    // get order details data
    const [orderData, setOrderData] = useState([]);
    const [loder, setLoder] = useState(true);

    // getting order
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
        if (!loder) {
            calculateConnects()
        }
    }, [loder])

    let fName = orderData?.task_details?.order_accepted_by[0]?.first_name
    // connect calculating func
    const [connectVal, setConnectVal] = useState(orderData?.task_details?.available_invites?.invites);
    const calculateConnects = () => {
        let finalConnects = orderData?.task_details?.available_invites?.invites - orderData?.task_details?.invitedStudents?.length
        setConnectVal(finalConnects)
    }

    // console.log(connectVal)
    // connects modal
    const [show, setShow] = useState(false);
    const handleShow = () => {
        // debugger
        if (connectVal === 0) {
            // by setShow to true AddConnectsModal modal will popup
            setShow(true);
        } else {
            setTimeout(() => {
                navigate(`/dashboardRoute/all-students/invite-students/${taskId}/${orderData?.task_details?.order_details[0]?.id}`)
            }, 100);
        }
    }
    // check for continue button
    const redirectionFunc = () => {
        // here connectVal are not used in redirected component || paymentFor 0 means it is payment for order
        setTimeout(() => {
            navigate(`/dashboardRoute/customer-notification/payment/${connectVal}/${taskId}/0`)
        }, 100);
    }


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
                    <div className='bgNotiLines customerDetai'>
                        <Container>
                            <h2 className='text-center alignIt'>My  <span className='green'>Task</span></h2>
                            <div className='orderContentMain mtT10px'>
                                <Row className='wd59 elementCenter justify-content-center'>
                                    {orderData?.task_details?.order_details[0].status === 1
                                        &&
                                        <div className='notificationBaar'>
                                            <img
                                                style={{ width: "48px", height: '45px', borderRadius: "50%", objectFit: "cover" }}
                                                src={orderData?.task_details?.order_accepted_by[0]?.image}
                                                alt=""
                                            />
                                            <p style={{ marginLeft: "14px" }}>
                                                <span style={{ color: "#82D051" }} >
                                                    {fName}
                                                </span> &nbsp;
                                                accepted Your Request Please Start.
                                            </p>
                                            <Link to="" onClick={redirectionFunc}>Continue</Link>
                                        </div>
                                    }

                                    <h4 className='customerDetai4'>Task Details</h4>
                                    <Col md={6}>
                                        <div className='mergeImg'>
                                            {orderData?.task_details?.invitedStudents.slice(0, 4).map((item) => {
                                                return (<img className='profileImgM' src={item?.image} alt="" referrerpolicy="no-referrer" />)
                                            })}

                                            <div>
                                                <p>+{orderData?.task_details?.invitedStudents.length ?? 0} Student Invites</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className='orderHedg'>
                                            <>
                                                <img src="/assets/images/offer/boxg.svg" alt="" />
                                            </>
                                            <p>Hourly Pay</p>
                                            <><button style={{ cursor: "unset" }}>${orderData?.task_details?.hourly_rate}</button></>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='justify-content-center'>
                                    <Col md={7}>
                                        <div className='orderDetailRight'>
                                            <div className='orderfirstBox w-100'>
                                                <div className='orderfirstBoxP w-100'>
                                                    <div>
                                                        <img src="/assets/images/customerDashboard/circleDott.svg" alt="" />
                                                    </div>
                                                    <div>
                                                        <p>Job Type</p>
                                                        <h5>{orderData?.task_details?.type}</h5>
                                                    </div>

                                                </div>
                                                <div className='orderfirstBoxP w-100'>
                                                    <div>
                                                        <img src="/assets/images/customerDashboard/vectortask.svg" alt="" />
                                                    </div>
                                                    <div>
                                                        <p>Task</p>
                                                        <h5>{orderData?.task_details?.title}</h5>
                                                    </div>

                                                </div>
                                                <div className='orderfirstBoxP w-100'>
                                                    <div>
                                                        <img src="/assets/images/customerDashboard/vectorlocation.svg" alt="" />
                                                    </div>
                                                    <div>
                                                        <p>Location</p>
                                                        <h5>{orderData?.task_details?.location?.city}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='orderfirstBox w-100'>
                                                <div className='orderfirstBoxP w-100'>
                                                    <div>
                                                        <img src="/assets/images/customerDashboard/Vectordate.svg" alt="" />
                                                    </div>
                                                    <div>
                                                        <p>Start Date</p>
                                                        <h5>{orderData?.task_details?.start_date}</h5>
                                                    </div>
                                                </div>
                                                <div className='orderfirstBoxP w-100'>
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

                                        <div className='orderDetailRight setTsdk'>
                                            <div className='d-flex1 mb-2'>
                                                <p className='ml-1' style={{ color: "#82D051" }}>Task Description</p>
                                                {/* connects */}
                                                <p
                                                    style={{ color: "#82D051", marginRight: "10px", display: "flex", alignItems: "center" }}>
                                                    <img
                                                        src="/assets/images/customerDashboard/circleDott.svg"
                                                        alt=""
                                                        style={{ marginRight: "5px" }}
                                                    />
                                                    Remaining Connects
                                                    <span className='connectsSpan'>{connectVal}</span>
                                                </p>
                                            </div>
                                            <span className='pd0101'>
                                                {orderData?.task_details?.description}
                                            </span>
                                        </div>
                                        <div className='payBtnDiv justify-content-end'>
                                            <Link
                                                className='secondary common cancelBtn1'
                                                to='/dashboardRoute/customer-profile' >Cancel Task
                                            </Link>
                                            &nbsp;&nbsp;&nbsp;
                                            <Link
                                                onClick={handleShow}
                                                to=""
                                                className='primary common'>
                                                Invite Students
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                        {/* connects purchasing Modal */}
                        <AddConnectsModal show={show} setShow={setShow} taskId={taskId} />
                        <div>
                            <FooterNav />
                        </div>
                    </div>
            }

        </>

    )
}

export default CustomerTaskDetails