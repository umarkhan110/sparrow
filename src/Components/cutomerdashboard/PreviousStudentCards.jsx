import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import ReactStars from 'react-stars';

const PreviousStudentCards = (props) => {

    // console.log(props?.studentData) 

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

    let studentAboutData = "Morbi et placerat lorem. In nec dui mattis, iaculis nulla erat et, scelerisque erat metus. Donec id euismod euismod erat. Morbi et placerat lorem. In nec dui mattis,";
    if (props?.studentData?.student?.student_details?.about) {
        studentAboutData = props?.studentData?.student?.student_details?.about + ' ';

    }

    let countPrimaryTask = 0
    let terminateLoop = false
    const resultForPrimaryTask = (props?.studentData?.student?.student_details?.skills?.length > 0) ? (

        props?.studentData?.student?.student_details?.skills.split(/\s*,\s*/).map((item) => {
            // debugger
            if (!terminateLoop) {
                countPrimaryTask += item.length;
                if (countPrimaryTask < 35) {
                    return <span>{item}</span>
                } else {
                    terminateLoop = true;
                    return (<Link to={{ pathname: `/dashboardRoute/all-students/customer-student-profile/${props?.studentData?.student_id}` }} role='button'><img src='/assets/images/customerDashboard/ActionsPlus_bold.svg' className='imageForMoreTask' alt="" /></Link>
                        // break;
                    )
                }
            }
        })
    ) : ''

    const [goldenCard, setGoldenCard] = useState(false);

    return (
        <div className='profileBox textLeft'>
            <div className='profileContainer'>
                <div className='profileImg'><img className='profileImgM imgBorder' src={props?.studentData?.student?.image} alt="" />
                    <img className='badgeStdnt' src="/assets/images/home/badgeForStdnt.svg" alt="" />
                    {
                        goldenCard ? <img className='romaalimg' src="/assets/images/home/romaalG.svg" alt="" /> :
                            <img className='romaalimg' src="/assets/images/home/romaal.svg" alt="" />
                    }
                </div>
                <div className='profilHed'>
                    <h3 className='profileBoxH3'>{props?.studentData?.student ? <>
                        {props?.studentData?.student?.first_name && props?.studentData?.student?.first_name}
                        {props?.studentData?.student?.last_name && " " + props?.studentData?.student?.last_name.charAt(0).toUpperCase() + '.'}
                        {props?.studentData?.student?.student_details?.dob && getAge(props?.studentData?.student?.student_details?.dob) + "'"}
                    </> :
                        'Adam W, 21 yrs.'
                    }
                    </h3>
                    <p className='profileBoxP elementCenter'>{props?.studentData?.student?.student_details?.college ? props?.studentData?.student?.student_details?.college : 'Foothill college'}</p>
                    <div className='profileBoxStars'>
                        <ReactStars
                            count={5}
                            size={25}
                            edit={false}
                            color2={'#FFC700'}
                            color1={'#FFC70040'}
                            className="pe-none d-flex justify-content-center"
                            value={(props?.studentData?.student?.orders?.overall_rating ? props?.studentData?.student?.orders?.overall_rating : 5)}
                        />
                    </div>
                    <div className='houlyRateValue profileBoxStars'>
                        ${(props?.studentData?.student?.student_details?.minimum_hourly_rate ? props?.studentData?.student?.student_details?.minimum_hourly_rate : 0)}/hr
                    </div>
                </div>
                <div className='profileContent'>
                    <h4 className='profileBoxSubhed'>Completed Tasks</h4>
                    <div className='profileTaks flex-wrap'>

                        {(props?.studentData?.student?.student_details?.skills) ? resultForPrimaryTask
                            : <>
                                <span>Babysitting</span>
                                <span>Pet Sitting</span>
                            </>}

                    </div>
                </div>
                <div className='profileAbout'>
                    <h4 className='profileBoxSubhed'>Task Discription</h4>
                    <p>
                        {/* {(props?.studentData?.student?.student_details?.about) ? 
                            ((props?.studentData?.student?.student_details?.about.length > 115) ? 
                                props?.studentData?.student?.student_details?.about?.substring(0, 115) + '... ' 
                                : 
                                props?.studentData?.student?.student_details?.about + ' ')
                            : "Morbi et placerat lorem. In nec dui mattis, iaculis nulla et, scelerisque metus. Donec id euismod erat... "
                        }
                        
                        <Link to={{ pathname: `/dashboardRoute/all-students/customer-student-profile/${props?.studentData?.student_id}` }} className='green'>View More</Link> */}
                        {<span className='overflowText line-clamp'>{studentAboutData}</span>}
                    </p>
                </div>
            </div>
            <div className='profileBtn'>
                <Link to="" className='primary bookNowBtn'>Hire Again</Link></div>
        </div>
    )
}

export default PreviousStudentCards