import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { deleteStudent } from '../../services/savestudents/DeleteStudent';
import { getAllSaveStudents } from '../../services/savestudents/GetAllStudents';
import { saveStudent } from '../../services/savestudents/SaveStudent';
import { ShowAllStudents } from '../../services/users/ShowAllStudents';

import ReactStars from 'react-stars';

export default function StudentProfileCard({ className = '', invite, bookNow, studentData, setAllStudent, setSavedStudents, none }) {
    let navigate = useNavigate();

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

    // defing userrole and user id 
    let user_role = JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.role;
    let user_id = JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id;
    // delete student
    const action_DeleteFav = async (std_id, num) => {
        if (JSON.parse(localStorage.getItem('sparrowSignIn'))?.user) {

            if (user_role === 'client') {

                const resp = await deleteStudent(std_id);
                // if num is 1 then view all screen api calls and for 2 savedStudents screen api is called
                if (num === 1) {
                    const response1 = await ShowAllStudents(2, (JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id));
                    setAllStudent(response1.data.users)
                } else if (num === 2) {
                    const respSavedStudents = await getAllSaveStudents(user_id)
                    setSavedStudents(respSavedStudents?.data?.student)
                }

                // checking student is removed or so
                if (resp.status === 200) {

                } else {
                    Swal.fire({
                        title: resp.data.message,
                        timer: 1500,
                        icon: "error",
                        showConfirmButton: false,
                    });
                }
            } else if (user_role === 'student') {
                Swal.fire({
                    title: 'Please logged-in as a client',
                    timer: 1500,
                    icon: "error",
                    showConfirmButton: false,
                });
            }
        } else {
            navigate('/signin');
        }
    }

    let countPrimaryTask = 0
    let terminateLoop = false

    // papulate about variable from home page featured api aur student api

    let imageUrl = '/assets/images/Groupa21765.png'
    if (studentData?.image) {
        imageUrl = studentData?.image;

    }

    let studentAboutData = "Morbi et placerat lorem. In nec dui mattis, iaculis nulla erat et, scelerisque erat metus. Donec id euismod euismod erat. Morbi et placerat lorem. In nec dui mattis,";
    if (studentData?.student_details?.about) {
        studentAboutData = studentData?.student_details?.about + ' ';

    } else if (studentData?.image) {
        studentAboutData = studentData?.about + ' ';
    }
    // papulate minum rate variable from home page featured api aur student api
    let studentMinumunHourlyRate = 24
    if (studentData?.student_details?.minimum_hourly_rate) {
        studentMinumunHourlyRate = studentData?.student_details?.minimum_hourly_rate;
    } else if (studentData?.minimum_hourly_rate) {
        studentMinumunHourlyRate = studentData?.minimum_hourly_rate;
    }

    let studentDateOfBirth = " 21'"
    if (studentData?.student_details?.dob) {
        studentDateOfBirth = " " + getAge(studentData?.student_details?.dob) + "'"
    } else if (studentData?.dob) {
        studentDateOfBirth = " " + getAge(studentData?.dob) + "'"
    }
    //paulate value for star rating
    let starRatingValue = 5
    if (studentData?.orders?.overall_rating) {
        starRatingValue = studentData.orders.overall_rating
    } else if (studentData?.overall_rating) {
        starRatingValue = studentData.overall_rating
    }

    let skillValue = (studentData?.student_details?.skills ? studentData?.student_details?.skills : studentData?.skills)
    let pathPage = `/signInRoute/all-students/single-student-profile/${studentData.id}`;
    if (localStorage.getItem('sparrowSignIn')) {

        pathPage = `/dashboardRoute/all-students/customer-student-profile/${studentData.id}`

    }
    const resultForPrimaryTask = (skillValue?.length > 0) ? (
        skillValue.split(/\s*,\s*/).map((item) => {
            // debugger
            if (!terminateLoop) {
                countPrimaryTask += item.length;
                if (countPrimaryTask < 25) {
                    return <span>{item}</span>
                } else {
                    terminateLoop = true;
                    return (<Link to={{ pathname: pathPage }} role='button'><img src='/assets/images/customerDashboard/ActionsPlus_bold.svg' className='imageForMoreTask' alt="" /></Link>
                        // break;
                    )
                }
            }
        })
    ) : ''


    // saving students
    const action_AddToFav = async (std_id) => {
        if (JSON.parse(localStorage.getItem('sparrowSignIn'))?.user) {
            // for getting client as a user
            if (user_role === 'client') {
                const data = {
                    client_id: user_id,
                    student_id: std_id
                }
                const resp = await saveStudent(data)
                const response1 = await ShowAllStudents(2, (JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id));
                setAllStudent(response1.data.users)


                if (resp.status === 200) {

                } else {
                    Swal.fire({
                        title: resp.data.message,
                        timer: 1500,
                        icon: "error",
                        showConfirmButton: false,
                    });
                }
            } else {
                Swal.fire({
                    title: 'Please logged-in as a client',
                    timer: 1500,
                    icon: "error",
                    showConfirmButton: false,
                });
            }
        } else {
            navigate('/signin');
        }
    }

    return (
        <div className='profileBox'>
            <div className='profileContainer'>
                <div className='profileImg'>

                    <img className='profileImgM imgBorder' src={imageUrl} alt="" />

                    <img className='badgeStdnt' src="/assets/images/home/badgeForStdnt.svg" alt="" />
                    {/* student_saved_id coming from customermyStudent component and is for checking student is saved so show goldenRomal img  || none is coming from HomeStudentProfile component*/}
                    {
                        studentData?.student_saved_by?.length > 0 || studentData?.student_saved_id ?
                            <div className={`hoverTextDiv ${none}`}>
                                {/* required the student_saved_by for removing from favourite students */}
                                {/* removing from view all student screen */}
                                {studentData?.student_saved_by?.length ?
                                    <>
                                        <img className='romaalimg' src="/assets/images/home/romaalG.svg" alt="" onClick={() => action_DeleteFav(studentData.student_saved_by[0].id, 1)} />
                                        <span className="hoverText">Remove from favorite students</span>
                                    </>
                                    : ''}
                                {/* removing from saved student screen */}
                                {studentData?.student_saved_id ?
                                    <>
                                        <img className='romaalimg' src="/assets/images/home/romaalG.svg" alt="" onClick={() => action_DeleteFav(studentData?.student_saved_id, 2)} />
                                        <span className="hoverText">Remove from favourite students</span>
                                    </>
                                    : ''}

                            </div>
                            :
                            <div className={`hoverTextDiv ${none}`} id={className}>
                                <img className='romaalimg' src="/assets/images/home/romaal.svg" alt="" onClick={() => action_AddToFav(studentData?.id)} />
                                <span className="hoverText">Add to favorite students</span>
                            </div>
                    }
                </div>
                <div className='profilHed profileBoxStars' onClick={() => navigate(pathPage)}>
                    <h3 className='profileBoxH3'>{studentData ? <>
                        {studentData.first_name && studentData?.first_name}
                        {studentData.last_name && " " + studentData?.last_name.charAt(0).toUpperCase()}
                        {studentDateOfBirth}

                    </> :
                        'Adam W, 21 yrs.'
                    }
                    </h3>
                    <p className='profileBoxP elementCenter'>
                        {/* <span><img src="/assets/images/home/cap.svg" alt="" /></span> */}
                        {studentData?.student_details?.college ? studentData?.student_details?.college : 'Foothill college'}</p>
                    <div className='profileBoxStars'>
                        {/* <span>5.0</span> */}
                        {/* <img src="/assets/images/home/Star 5.svg" alt="" />
                        <img src="/assets/images/home/Star 5.svg" alt="" />
                        <img src="/assets/images/home/Star 5.svg" alt="" />
                        <img src="/assets/images/home/Star 5.svg" alt="" />
                        <img src="/assets/images/home/Star 5.svg" alt="" /> */}
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
                <div className='profileContent' onClick={() => navigate(pathPage)}>
                    <h4 className='profileBoxSubhed'>Featured Tasks</h4>
                    <div className='profileTaks flex-wrap'>

                        {(studentData?.skills || studentData?.student_details?.skills) ? resultForPrimaryTask
                            : <>
                                <span>None</span>

                            </>}
                    </div>
                </div>
                <div className='profileAbout' onClick={() => navigate(pathPage)}>
                    <h4 className='profileBoxSubhed'>About me</h4>
                    <p>
                        {<span className='overflowText line-clamp'>{studentAboutData}</span>}

                        {/* {studentData && (studentData?.student_details?.about?.length > 130 || studentData?.about?.length > 130) ? <Link to={{ pathname: `/dashboardRoute/all-students/customer-student-profile/${studentData.id}` }} className="green stdcardViewMore"> View More</Link>: null }  */}
                    </p>
                </div>
            </div>
            <div className='profileBtn'>
                <Link to={(JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role === "client" ? `/dashboardRoute/all-students/create-tasks/${studentData?.id}/${studentData?.fcm_token}` :
                    (JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role === "student" ? "/dashboardRoute/student-profile/" :
                        "/signin"} className='primary bookNowBtn'>{invite}{bookNow}</Link>
            </div>
        </div >
    )
}