import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { createNotification } from '../../../services/notifications/CreateNotification';
import { sendNotification } from '../../../services/notifications/SendNotification';
import ReactStars from 'react-stars';
// import { createChatRoom } from './CreatingChatRoom';
import { inviteStudent } from '../../../services/invitestudents/InviteStudent';
import Swal from 'sweetalert2';

export default function StudentInviteCard({ studentData }) {
    let { taskId, orderId } = useParams();
    const [btnLoder, setBtnLoder] = useState(false)
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
    // defining userrole and user id 
    // let user_role = JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.role;
    let client_id = JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id;
    let client_Name = JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.first_name;


    let countPrimaryTask = 0
    let terminateLoop = false
    // papulate about variable from home page featured api aur student api
    let aboutViewMoreLink = <Link to={{ pathname: `/dashboardRoute/all-students/customer-student-profile/${studentData.id}` }} className="green">View More</Link>;

    // let studentAboutData = "Morbi et placerat lorem. In nec dui mattis, iaculis nulla erat et, scelerisque erat metus. Donec id euismod euismod erat. Morbi et placerat lorem. In nec dui mattis,";
    // if (studentData?.student_details?.about) {
    //     studentAboutData = (studentData?.student_details?.about.length > 130) ? studentData?.student_details?.about?.substring(0, 130) + '... ' : studentData?.student_details?.about + ' '
    // } else if (studentData?.about) {
    //     studentAboutData = (studentData?.about.length > 130) ? studentData?.about?.substring(0, 130) + '... ' : studentData?.about + ' '
    // }

    let studentAboutData = "Morbi et placerat lorem. In nec dui mattis, iaculis nulla erat et, scelerisque erat metus. Donec id euismod euismod erat. Morbi et placerat lorem. In nec dui mattis,";
    if (studentData?.student_details?.about) {
        studentAboutData = studentData?.student_details?.about + ' ';

    } else if (studentData?.image) {
        studentAboutData = studentData?.about + ' ';
    }
    // papulate minum rate variable from home page featured api aur student api
    let studentMinumunHourlyRate = 0
    if (studentData?.student_details?.minimum_hourly_rate) {
        studentMinumunHourlyRate = studentData?.student_details?.minimum_hourly_rate;
    } else if (studentData?.minimum_hourly_rate) {
        studentMinumunHourlyRate = studentData?.minimum_hourly_rate;
    }
    //paulate value for star rating
    let starRatingValue = 5
    if (studentData?.orders?.overall_rating) {
        starRatingValue = studentData.orders.overall_rating
    } else if (studentData?.overall_rating) {
        starRatingValue = studentData.overall_rating
    }
    // papulate dateofBirth variable from home page featured api aur student api
    let studentDateOfBirth = (studentData?.student_details?.dob ? (studentData?.student_details?.dob && ' ' + getAge(studentData?.student_details?.dob) + "'") : (studentData?.dob && ' ' + getAge(studentData?.dob) + "'"))
    let skillValue = (studentData?.student_details?.skills ? studentData?.student_details?.skills : studentData?.skills)
    const resultForPrimaryTask = (skillValue?.length > 0) ? (

        skillValue.split(/\s*,\s*/).map((item) => {
            // debugger
            if (!terminateLoop) {
                countPrimaryTask += item.length;
                if (countPrimaryTask < 25) {
                    return <span>{item}</span>
                } else {
                    terminateLoop = true;
                    return (<Link to={{ pathname: `/dashboardRoute/all-students/customer-student-profile/${studentData.id}` }} role='button'><img src='/assets/images/customerDashboard/ActionsPlus_bold.svg' className='imageForMoreTask' alt="" /></Link>
                        // break;
                    )
                }
            }
        })
    ) : ''

    // inviting the student
    const [classOfInvite, setClassOfInvite] = useState("primary bookNowBtn")

    const InviteStudent = async (std_id) => {
        // debugger
        setBtnLoder(true)
        // creating invite students number for record
        const data2 = {
            task_id: taskId,
            client_id: client_id,
            student_id: std_id
        }
        const response = await inviteStudent(data2)
        if (response.status === 200) {
            // console.log('happy')

            const data = {
                fcmToken: studentData?.fcm_token,
                title: "Order Recieved",
                body: `Order Recieved from ${client_Name}`
            }
            const resp = await sendNotification(data)

            // creating chatRoom here
            // let std_String = std_id.toString()
            // let client_String = client_id.toString()
            // createChatRoom(std_String, client_String, taskId, orderId)

            // creating notifiaction for All notififcation tab
            const data1 = {
                // as reqirement by backend type is 0
                type: 0,
                to_id: std_id,
                from_id: client_id,
                data: {
                    title: "Order Recieved",
                    message: `Order Recieved from ${client_Name}.Click to proceed`,
                    action_url: `/dashboardRoute/chatStudent/student-task-descp/${taskId}/${orderId}`
                },
                read_at: null
            }
            const resp1 = await createNotification(data1)

            if (resp.status === 200 && resp1.status === 200 && response.status === 200) {
                setClassOfInvite("primary bookNowBtn disalbed")
                // console.log("Noti Created")
                setBtnLoder(false)
            }
        } else {
            Swal.fire({
                title: "You have reached the invitations limit for today",
                timer: 2500,
                icon: "error",
                showConfirmButton: false,
            });
            setBtnLoder(false)
        }
    }

    return (
        <div className='profileBox w-100 inviteStdCard_class'>
            <div className='profileContainer'>
                <div className='profileImg'>
                    <img className='profileImgM imgBorder' src={studentData?.image} alt="" />
                    <img className='badgeStdnt' src="/assets/images/home/badgeForStdnt.svg" alt="" />
                    {
                        studentData?.student_saved_by?.length > 0 || studentData?.student_saved_id ?
                            <div className="hoverTextDiv">
                                {/* required the student_saved_by for removing from favourite students */}
                                {/* removing from view all student screen */}
                                {studentData?.student_saved_by?.length ?
                                    <>
                                        <img className='romaalimg' src="/assets/images/home/romaalG.svg" alt="" />
                                        <span className="hoverText">Remove from favorite students</span>
                                    </>
                                    : ''}
                                {/* removing from saved student screen */}
                                {studentData?.student_saved_id ?
                                    <>
                                        <img className='romaalimg' src="/assets/images/home/romaalG.svg" alt=""/>
                                        <span className="hoverText">Remove from favourite students</span>
                                    </>
                                    : ''}

                            </div>
                            :
                            <div className="hoverTextDiv">
                                <img className='romaalimg' src="/assets/images/home/romaal.svg" alt="" />
                                <span className="hoverText">Add to favorite students</span>
                            </div>
                    }
                </div>
                <div className='profilHed'>
                    <h3 className='profileBoxH3'>{studentData ? <>
                        {studentData.first_name && studentData?.first_name}
                        {studentData.last_name && " " + studentData?.last_name.charAt(0).toUpperCase() + '.'}
                        {studentDateOfBirth}
                    </> :
                        'Adam W, 21 yrs.'
                    }
                    </h3>
                    <p className='profileBoxP elementCenter'>
                        {/* <span><img src="/assets/images/home/cap.svg" alt="" /></span> */}
                        {studentData?.student_details?.college ? studentData?.student_details?.college : 'Foothill college'}
                    </p>
                    <div className='profileBoxStars'>
                        <ReactStars
                            count={5}
                            size={25}
                            edit={false}
                            color2={'#FFC700'}
                            color1={'#FFC70040'}
                            className="pe-none d-flex justify-content-center"
                            value={starRatingValue}
                        />
                    </div>
                    <div className='houlyRateValue profileBoxStars'>
                        ${studentMinumunHourlyRate}/hr
                    </div>
                </div>
                <div className='profileContent'>
                    <h4 className='profileBoxSubhed'>Featured Tasks</h4>
                    <div className='profileTaks flex-wrap'>

                        {(studentData?.skills || studentData?.student_details?.skills) ? resultForPrimaryTask
                            : <>
                                <span>Babysitting</span>
                                <span>Pet Sitting</span>
                            </>}

                    </div>
                </div>
                <div className='profileAbout'>
                    <h4 className='profileBoxSubhed'>About me</h4>
                    <p>
                        {<span className='overflowText line-clamp'>{studentAboutData}</span>}

                        {/* {studentData && (studentData?.student_details?.about?.length > 130 || studentData?.about?.length > 130) ? <Link to={{ pathname: `/dashboardRoute/all-students/customer-student-profile/${studentData.id}` }} className="green stdcardViewMore"> View More</Link>: null }  */}
                    </p>
                </div>
            </div>
            <div className='profileBtn'>
                {btnLoder ?
                    <div className="relative bookBtnNow">
                        <div className="loader alignLoader"></div>
                        <Link className={classOfInvite} to="" >Invite</Link>
                    </div>
                    :
                    <Link className={classOfInvite}
                        to=""
                        onClick={() => InviteStudent(studentData.id)}>
                        Invite
                    </Link>
                }
                {/* <Link className={classOfInvite} to="" onClick={() => InviteStudent(studentData.id)}>Invite</Link> */}
            </div>
        </div>
    )
}