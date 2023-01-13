import { Col, Container, Row } from 'react-bootstrap'
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Pagination } from "swiper";
import StudentProfileCard from './StudentProfileCard';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ShowHomePageFeaturedStudents } from '../../services/users/ShowHomePageFeaturedStudents';

function HomeStudentProfile() {
    const [loder, setLoder] = useState(true);
    const [featuredStudent, setFeaturedStudent] = useState(false);

    const getFeaturedStudent = async () => {
        const response = await ShowHomePageFeaturedStudents();
        if (response.status === 200) {
            setFeaturedStudent(response?.data?.users);
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
        getFeaturedStudent();
    }, [])

    const bookNow = 'Book Now';
    const none = 'noneFetured';

    return (
        <div className='stdProfile'>
            <Container>
                <div className='profileHead'>
                    <h2>Find your <span className='green'>Student Helper</span></h2>
                    <h6 className='subhead'>A platform exclusively built on ambitious, creative and fun college students.</h6>
                </div>

                <div className='profileBoxes homeUserSlidr homeUserSlidrResponsive remove padding0'>
                    {loder ? (
                        <div className="height100vh">
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
                        <Swiper
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                922: {
                                    slidesPerView: 3,
                                },
                            }}
                            slidesPerView={3}
                            spaceBetween={30}
                            // loop={true}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                        >
                            {featuredStudent.slice(0, 5).map((singleStudent) => {
                                return (
                                    <SwiperSlide>
                                        {/* <StudentProfileCard studentData={singleStudent} bookNow={bookNow} none={none}/> */}
                                        <StudentProfileCard studentData={singleStudent} bookNow={bookNow}/>

                                    </SwiperSlide>
                                )
                            })
                            }
                        </Swiper>
                    )}
                </div>

                <div>
                    <Link to="/signInRoute/all-students" className='primary viewAllbtn'>View All</Link>
                </div>
            </Container>
        </div>
    )
}

export default HomeStudentProfile