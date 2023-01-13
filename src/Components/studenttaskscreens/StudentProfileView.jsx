import { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import FooterNav from '../mobilefooternav/FooterNav'
import Swal from 'sweetalert2';
import { showStudent } from '../../services/users/ShowSingleStudent';
import StudentUpdate from './studentModal/StudentUpdate';
import StudentDetailUpdate from './studentModal/StudentDetailUpdate';
import Moment from 'react-moment';
import { days, timeSlots } from '../../services/availibility&timeslots/Availibility';
import { singleUserAvailability } from '../../services/availibility&timeslots/SingleUserAvailability';
import { getStudentOrders } from '../../services/order/StudentOrderList';
import StudentWorkAvalibityUpdate from './studentModal/StudentWorkAvalibityUpdate';
import StudentReview from './studentModal/StudentReview';

// 


import {
    collection as fireStoreCollectione,
    query as fireStoreQuery,
    where as fireStoreWhere,
    getDocs as fireStoreDocs,
    onSnapshot,
    doc,
    QuerySnapshot,
    getFirestore,
    addDoc,
    orderBy,
    Firestore,
    Timestamp,
    setDoc,
    getDocs,
} from "firebase/firestore"
import { firebaseConfig } from '../../firebase/FireBase';
import { initializeApp } from 'firebase/app';
import { verificationAccount } from '../../services/authentication/VerificationNotification';
const StudentProfileView = () => {
    // firebase
    const appNew = initializeApp(firebaseConfig);
    const dbNew = getFirestore(appNew);


    //for navigation
    let navigate = useNavigate();

    // const [updateContent, setUpdateContent] = useState(false);
    const [current_student, setCurrentStudent] = useState(false);
    const [loder, setLoder] = useState(true);
    // declare the data fetching function
    const current_user_id = parseInt(JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id);

    const fetchData = async () => {
        const current_student = await showStudent(current_user_id);
        if (current_student.status === 200) {

            if(current_student.data.user.email_verified_at === null){
                Swal.fire({
                    title: 'Email is Not Verified!',
                    text: "Click yes, to visit verify email page.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#82d051',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Verify'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        const resp1 = verificationAccount(current_student?.data?.token)
                        setTimeout(() => {
                            Swal.fire({
                                title: "Email has been sent!",
                                timer: 1500,
                                icon: 'success',
                                showConfirmButton: false,
                            })
                        }, 1000);
        
                        setTimeout(() => {
                            navigate('/signUpRoute/confirm-email');
                        }, 2000);
                    }
                  })
            }

            setCurrentStudent(current_student?.data?.user);
            setLoder(false);
        }
    }


    // // get locations
    // const [locations, setlocations] = useState([])
    // const locationsFunc = async () => {
    //     const resp = await getLocations();
    //     setlocations(resp?.data)
    // }

    // get working days
    const [workdays, setworkdays] = useState();
    const getDaysFunc = async () => {
        const response = await days();

        if (response.status === 200) {

            let order = { monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6, sunday: 7 };
            let daysArray = response.data;
            daysArray.sort(function (a, b) {
                return order[a.day] - order[b.day];
            });

            setworkdays(daysArray);
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

    // get timing slots
    const [timeSlot, setTimeSlot] = useState();
    const getTimeFunc = async () => {
        const response1 = await timeSlots();

        if (response1.status === 200) {
            setTimeSlot(response1.data);
            setLoder(false);
        } else {
            Swal.fire({
                title: response1.data.message,
                timer: 1500,
                icon: "error",
                showConfirmButton: false,
            });
        }
    };

    useEffect(() => {
        // locationsFunc();
        getDaysFunc();
        getTimeFunc();
        //to be change in new effect
    }, [])

    const [current_student_avalibilty, setStudentWorkAvaliblity] = useState();
    const [workAvalible, setWorkAvalible] = useState(false);

    const fetchWorkAvalible = async () => {
        const current_student_avalible = await singleUserAvailability(current_user_id);
        if (current_student_avalible.status === 200) {
            setStudentWorkAvaliblity(current_student_avalible?.data?.availabilities);
            setWorkAvalible(true);
        }
    }

    let WeekDayswithData = current_student_avalibilty?.map(({ day }) => day);

    const searchtimeID = (nameKey, myArray) => {
        // debugger
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].slot == nameKey) {
                return myArray[i].id;
            }
        }
    };

    const searchdayID = (nameKey, myArray) => {
        //  debugger
        if (myArray) {
            for (var i = 0; i < myArray.length; i++) {
                if (myArray[i].day == nameKey) {
                    return myArray[i].id;
                }
            }
        } else {
            return;
        }

    };

    const arrayProp = [];
    {
        current_student_avalibilty?.map((mainItem) => {
            let dayID = searchdayID(
                mainItem.day,
                workdays
            )
            {
                timeSlot && mainItem.avail?.map((item_inner, index) => {
                    let startID = searchtimeID(
                        item_inner.start,
                        timeSlot
                    )
                    let endID = searchtimeID(
                        item_inner.end,
                        timeSlot
                    )
                    arrayProp.push({
                        start_time_slot_id: startID,
                        end_time_slot_id: endID,
                        day_id: dayID,
                        user_id: JSON.parse(localStorage.getItem("sparrowSignIn"))?.user?.id,
                    })

                })
            }
        })
    }


    const [current_student_taskReview, setStudentTaskReview] = useState();
    const fetchTaskReviews = async () => {
        const current_student_task_review = await getStudentOrders(current_user_id);
        if (current_student_task_review.status === 200) {
            setStudentTaskReview(current_student_task_review?.data);
        }
    }

    // console.log('current_student_taskReview : ', current_student_taskReview)

    let validTaskReview = [];
    current_student_taskReview?.orders?.map(singleReview => {
        if (singleReview?.feedback) {
            validTaskReview.push(singleReview)
        }
    })

    /* this is for student modal */
    const [studentEditModal, setStudentEditModal] = useState(false);
    const handleStudentClose = () => setStudentEditModal(false);
    /* this is end of student modal */

    /* this is for student Detail modal */
    const [studentDetailEditModal, setStudentDetailEditModal] = useState(false);
    const handleDetailClose = () => setStudentDetailEditModal(false);
    /* this is end of student Detail modal */

    /* this is for student Work Avaliblity modal */
    const [workAvaliblityEditModal, setWorkAvaliblityEditModal] = useState(false);
    const handleWorkAvaliblityClose = () => setWorkAvaliblityEditModal(false);
    /* this is end of student Work Avaliblity modal */

    /* this is for student review modal */
    const [stdReviewShow, setStdReviewShow] = useState(false);
    const handleStdReviewClose = () => setStdReviewShow(false);
    /* this is end of student review modal */

    useEffect(() => {
        fetchData();
        fetchWorkAvalible();
        fetchTaskReviews();
    }, [studentEditModal, studentDetailEditModal, workAvaliblityEditModal])
    // call the function




    const driverLicense = current_student?.student_details?.have_driving_licence == 1 ? "/assets/images/customerDashboard/circleSuccess.svg" : "/assets/images/customerDashboard/crossvector.svg";
    const haveCar = current_student?.student_details?.have_car == 1 ? "/assets/images/customerDashboard/circleSuccess.svg" : "/assets/images/customerDashboard/crossvector.svg";

    const getAge = (dateString) => {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    return (
        <>
            {loder ? (
                <div className="height100vh height10vh">
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
                </div>
            ) : (
                <div className='bgNotiLines'>
                    <Container>
                        <h2 className='mb-5 text-center'>Student <span className='green'>Profile</span></h2>
                        <Row>
                            <Col md={4}>
                                <div className='studentDetails'>
                                    <div>
                                        {studentEditModal && <StudentUpdate onClose={handleStudentClose} modalValue={studentEditModal} stdDetail={current_student} modalDone={() => setStudentEditModal(false)} />}

                                        <a style={{ cursor: 'pointer' }} onClick={() => setStudentEditModal(true)}>
                                            <img className='editImager ' src="/assets/images/customerDashboard/editButtonModal.svg" alt="" />
                                        </a>
                                    </div>
                                    <h4 className='mb-3'>student Details</h4>
                                    <div className='studentDetailsImg'>
                                        <img className='profileImgM imgBorder editImager setImgStdnt mb-0 position-relative' src={(current_student?.image) ? current_student?.image : "/assets/images/Groupa21765.png"} alt="" />
                                        {/* <img src={current_student?.image} alt="" /> */}
                                    </div>
                                    <h5 className='upH5'>
                                        {current_student?.first_name?.charAt(0)?.toUpperCase() + current_student?.first_name?.slice(1)}
                                        {current_student?.last_name && " " + current_student?.last_name.charAt(0).toUpperCase()}.
                                        {current_student?.student_details?.dob && ' ' + getAge(current_student?.student_details?.dob) + "'"}
                                    </h5>
                                    <h5 className='belowH5'>{current_student?.student_details?.grade} </h5>
                                    <div className='studentContent ml-1'>
                                        {current_student?.student_details?.college &&
                                            <div className='mb-3 block ml-3'>
                                                <img src="/assets/images/customerDashboard/capvector.svg" alt="" />
                                                <span className='ml-7'> {current_student?.student_details?.college?.charAt(0)?.toUpperCase() + current_student?.student_details?.college?.slice(1)} </span>
                                            </div>}
                                        {current_student?.location &&
                                            <div className='mb-3 block ml-3'>
                                                <img src="/assets/images/customerDashboard/lcoationvector.svg" alt="" />
                                                <span className='ml-7'>
                                                    &nbsp;{current_student?.location?.city}, {current_student?.location?.state}
                                                    {/* {locations?.map((x) => {
                                                    if (x?.id == current_student?.location?.id) {
                                                        return x.city+', '+x.state
                                                    }
                                                })} */}
                                                </span>
                                            </div>
                                        }
                                        <div className='block ml-3'>
                                            <img src="/assets/images/customerDashboard/verified-dashboar.svg" alt="" />
                                            <span className='ml-7'>{current_student?.email_verified_at ? " Verified" : " Not Verified"}</span>
                                        </div>
                                        <div className='profileBtn mt-5 ml0 displaynone-mb'>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={8}>
                                <div className='aboutMeBox stdDetailProfile'>
                                    <div>
                                        {studentDetailEditModal && <StudentDetailUpdate onClose={handleDetailClose} stdDetail={current_student} modalValue={studentDetailEditModal} modalDone={() => setStudentDetailEditModal(false)} />}

                                        <a style={{ cursor: 'pointer' }} onClick={() => setStudentDetailEditModal(true)}>
                                            <img className='editImager' src="/assets/images/customerDashboard/editButtonModal.svg" alt="" />
                                        </a>
                                    </div>
                                    <div className='mb-1'>
                                        <span><img src="/assets/images/customerDashboard/hourlyvector.svg" alt="" /></span>
                                        <span className=' ms-1 topHed mb-3 green'>Minimum Rate</span>
                                        <span className='timeSlotPills ms-1 py-1'>${current_student?.student_details?.minimum_hourly_rate}/hr</span>
                                        {/* </div> */}
                                    </div>
                                    <p className='aboutMainhed'>About Me</p>
                                    <p className='aboutContent'>
                                        {current_student?.student_details?.about}
                                        {/* <span className='green'>View More</span> */}
                                    </p>
                                    <div className='d-flex mb-4'>
                                        <div className='mr-28'>
                                            <p className='tickp'>Driver’s License &nbsp;&nbsp;</p>
                                            {/* <div> */}
                                            <img src={driverLicense} alt="" />
                                            {/* </div> */}
                                        </div>
                                        <div>
                                            <p className='tickp'>Own Vehicle&nbsp;&nbsp;</p>
                                            {/* <div> */}
                                            <img src={haveCar} alt="" />
                                            {/* </div> */}
                                        </div>
                                    </div>
                                    <p className='aboutMainhed mb-2 mb-9'>Featured Tasks</p>
                                    <div className='d-flex flex-wrap'>
                                        {current_student?.student_details ? current_student?.student_details?.skills?.split(/\s*,\s*/).map(index => {
                                            return <span className='fancySpan mb-1'>{index}</span>
                                        }) : ""}
                                    </div>
                                </div>
                                <Row>
                                    <Col lg={3} md={6} xs={6}>
                                        <div className='aboutMeBox aboutMeBox_lower'>
                                            <p className='aboutMainhed mb-2 mb5'>Hobbies</p>
                                            <ul className='aboutList'>
                                                {current_student?.student_details?.hobbies ? current_student?.student_details?.hobbies?.split(/\s*,\s*/).map(index => {
                                                    return <li>
                                                            {index.trim()?.charAt(0)?.toUpperCase() + index.trim()?.slice(1)}
                                                        </li>
                                                }) :
                                                    <>
                                                        <li> None</li>
                                                    </>
                                                }
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col lg={3} md={6} xs={6}>
                                        <div className='aboutMeBox aboutMeBox_lower'>
                                            <p className='aboutMainhed mb-2 mb5'>Languages</p>
                                            <ul className='aboutList'>
                                                {current_student?.student_details?.languages ? current_student?.student_details?.languages?.split(/\s*,\s*/).map(index => {
                                                    return <li>{index.trim()?.charAt(0)?.toUpperCase() + index.trim()?.slice(1)}</li>
                                                }) :

                                                    <>
                                                        <li> None</li>
                                                    </>}
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col lg={6} md={12}>
                                        <div className='aboutMeBox aboutMeBox_lower'>

                                            <p className='aboutMainhed mb-2 mb5'>Interesting Fact</p>
                                            <p className='aboutContent'>
                                                {current_student?.student_details ? (current_student?.student_details?.fun_facts?.length > 115) ? current_student?.student_details?.fun_facts?.substring(0, 115) + '... ' : current_student?.student_details?.fun_facts : "None"}
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col md={4}>
                                <div className='aboutMeBox profileStdAvalible'>
                                    <div>

                                        {workAvaliblityEditModal && <StudentWorkAvalibityUpdate onClose={handleWorkAvaliblityClose} modalValue={workAvaliblityEditModal} workAvail={workAvalible} workAvaliblity={arrayProp} modalDone={() => setWorkAvaliblityEditModal(false)} />}

                                        <a style={{ cursor: 'pointer' }} onClick={() => setWorkAvaliblityEditModal(true)}>
                                            <img className='editImager' src="/assets/images/customerDashboard/editButtonModal.svg" alt="" />
                                        </a>
                                    </div>
                                    <h4 className='mb-3 text-center block'>Work Availability</h4>
                                    <div className="mt-5">
                                        {workdays?.map((item) => {
                                            return (
                                                <div className="mb-3 timeSlotD">
                                                    <div className="workPoint">
                                                        <div className="state">
                                                            <label>
                                                                {item?.day.charAt(0).toUpperCase() +
                                                                    item?.day.slice(1)}
                                                            </label>
                                                        </div>
                                                    </div>

                                                    {/* if the avaliblity  */}

                                                    {(!current_student_avalibilty &&
                                                        <div className='workContent'>
                                                            <div className='d-flex mt-2'>
                                                                <span className='fancySpan'>Not Available</span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {current_student_avalibilty?.map((parentObjArray) => {

                                                        return (
                                                            <>
                                                                {parentObjArray?.day === item?.day && parentObjArray.avail ? (
                                                                    <div className='workContent'>
                                                                        <div className='d-flex mt-2 flex-wrap'>
                                                                            {parentObjArray.avail?.map(
                                                                                (item_inner, index) => {
                                                                                    return (

                                                                                        <span className='fancySpan mb-1'>
                                                                                            {item_inner.start}
                                                                                            -
                                                                                            {item_inner.end}
                                                                                        </span>

                                                                                    );
                                                                                }
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <></>
                                                                )}

                                                            </>
                                                        );
                                                    })}

                                                    {(WeekDayswithData?.indexOf(item?.day) == -1 ?
                                                        <div className='workContent'>
                                                            <div className='d-flex mt-2'>
                                                                <span className='fancySpan mb-3'>Not Available</span>
                                                            </div>
                                                        </div>
                                                        : <></>
                                                    )}
                                                </div>
                                            );
                                        })}

                                    </div>
                                </div>
                            </Col>
                            <Col md={8}>
                                <div className='aboutMeBox'>
                                    <h4 className='displaynone-mb-551 '> Reviews ({validTaskReview && validTaskReview?.length})</h4>
                                    <div className='workRateTop'>
                                        {/* <h4 className='green mb-3'>Rating</h4> */}
                                        <div className='workRateTopHed'>
                                            <h4>
                                                <div>
                                                    <span className=' displaynone-mb'>Reviews ({validTaskReview && validTaskReview?.length})</span>&nbsp;
                                                    {/* <span><img src="/assets/images/customerDashboard/Star 8.svg" alt="" /></span> */}
                                                </div>
                                            </h4>
                                        </div>

                                    </div>
                                    <div className='row mt-4 reviewSection_dashbord'>
                                        <div className='d-flex flex-column forTaskInReview col-lg-4 col-md-12 col-12'>
                                            <div className=' d-flex justify-content-between mb-2'>
                                                <p className='aboutMainhed'>Task Completed:</p>
                                                <p className='taskCompletedP'>{validTaskReview?.length > 0 ? validTaskReview?.length : 0}</p>
                                            </div>
                                            <div className=' d-flex justify-content-between'>
                                                <p className='aboutMainhed'>Rating:</p>
                                                <p className='taskCompletedP'>{current_student_taskReview?.rating[0] ? parseFloat(current_student_taskReview?.rating[0]?.overall_rating).toFixed(1) : 5.0}</p>
                                            </div>
                                        </div>


                                        <div className='ratingFeatures col-lg-8 col-md-12 col-12'>

                                            <div className='row'>
                                                <div className='col-6 d-flex justify-content-between'>
                                                    <span className='aboutContent mb-customr-student'>Performance:</span>
                                                    <span className='aboutContent green'> <span><img className='sStar' src="/assets/images/customerDashboard/Star 8.svg" alt="" /></span>&nbsp; <u>{current_student_taskReview?.rating[0] ? parseFloat(current_student_taskReview?.rating[0]?.overall_performance).toFixed(1) : '5.0'}</u></span>
                                                </div>
                                                <div className='col-6 d-flex justify-content-between'>
                                                    <span className='aboutContent mb-customr-student'>Attitude:</span>
                                                    <span className='aboutContent green'> <span><img className='sStar' src="/assets/images/customerDashboard/Star 8.svg" alt="" /></span>&nbsp; <u>{current_student_taskReview?.rating[0] ? parseFloat(current_student_taskReview?.rating[0]?.overall_attitude).toFixed(1) : '5.0'}</u> </span>
                                                </div>
                                            </div>
                                            <div className='row mt-2'>
                                                <div className='col-6 d-flex justify-content-between'>
                                                    <span className='aboutContent mb-customr-student'>Communication:</span>
                                                    <span className='aboutContent green'> <span><img className='sStar' src="/assets/images/customerDashboard/Star 8.svg" alt="" /></span>&nbsp; <u>{current_student_taskReview?.rating[0] ? parseFloat(current_student_taskReview?.rating[0]?.overall_communication).toFixed(1) : '5.0'}</u></span>
                                                </div>
                                                <div className='col-6 d-flex justify-content-between'>
                                                    <span className='aboutContent mb-customr-student'>Responsibility:</span>
                                                    <span className='aboutContent green'> <span><img className='sStar' src="/assets/images/customerDashboard/Star 8.svg" alt="" /></span>&nbsp; <u>{current_student_taskReview?.rating[0] ? parseFloat(current_student_taskReview?.rating[0]?.overall_responsibility).toFixed(1) : '5.0'}</u> </span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    {/* ratingComemt */}

                                    {validTaskReview?.length > 0 ?
                                        <>
                                            <div>
                                                {validTaskReview.slice(0, 4).reverse().map((singleReview) => {
                                                    return (
                                                        <div className='ratingComment'>
                                                            <div className='ratingCommentHed'>
                                                                <div><img className='commentImg' src="/assets/images/customerDashboard/unsplash_FcLyt7lW5wg.png" alt="" /></div>
                                                                <div>
                                                                    <p className='aboutMainhed'>{singleReview?.client?.first_name && singleReview?.client?.last_name ? singleReview?.client?.first_name + " " + singleReview?.client?.last_name.charAt(0).toUpperCase() : "Ava"}  </p>
                                                                    <div className='setComentHed'>
                                                                        <p className='aboutMainCC'>{singleReview?.task?.title}</p>
                                                                        <p className='setCommntContent aboutContent'> <span><img src="/assets/images/customerDashboard/Star 8.svg" alt="" /></span> {parseFloat((singleReview?.feedback?.responsibility + singleReview?.feedback?.performance + singleReview?.feedback?.communication + singleReview?.feedback?.attitude) / 4).toFixed(1)}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <p className='aboutContent'>{singleReview?.task?.description ? singleReview?.task?.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<span className='green'> View *More</span>"}</p>
                                                            <p className='publishP'>Publish <Moment fromNow>{singleReview?.feedback?.updated_at}</Moment></p>
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                            <div className='text-center'>
                                                <StudentReview onClose={handleStdReviewClose} modalValue={stdReviewShow} reviewStudent={validTaskReview} />
                                                <a className='workViewAll' style={{ cursor: 'pointer' }} onClick={() => setStdReviewShow(true)}>View More</a>
                                            </div>
                                        </>
                                        :
                                        <div className='ratingComment pb-0 noTaskForReview'>
                                            <p className='publishP'>No Task Reviews</p>
                                        </div>
                                    }

                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <div>
                        <FooterNav />
                    </div>
                </div >
            )}
        </>

    )
}

export default StudentProfileView