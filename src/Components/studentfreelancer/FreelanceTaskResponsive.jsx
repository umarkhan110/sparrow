import { Col, Container, Row } from 'react-bootstrap'
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Pagination } from "swiper";
import { Link } from 'react-router-dom';

const FreelanceTaskResponsive = () => {
    return (
        <div className='HomeTasksResponsive'>
            <div className='homeUserSlidrResponsive'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    // loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className='taskBox'>
                            {/* <div className='boxImg'><img src="/assets/images/home/t1.png" alt="" /></div> */}
                            <div className='boxImg'><img src="/assets/images/studentfreelance/Housekeeping.svg" alt="" /></div>
                            <div className='taskBoxContent'>
                                <h4 className='green'>Housekeeping</h4>
                                <p>Help with dishes, vacuuming, window cleaning and other errands in the house. </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='taskBox'>
                            {/* <div className='boxImg'><img src="/assets/images/home/t8.png" alt="" /></div> */}
                            <div className='boxImg'><img src="/assets/images/studentfreelance/Tutoring.svg" alt="" /></div>
                            <div className='taskBoxContent'>
                                <h4 className='green'>Tutoring</h4>
                                <p>Tutor children in any subject to help improve their grades in the classroom.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='taskBox'>
                            {/* <div className='boxImg'><img src="/assets/images/home/t2.png" alt="" /></div> */}
                            <div className='boxImg'><img src="/assets/images/studentfreelance/Pet Sitting.svg" alt="" /></div>
                            <div className='taskBoxContent'>
                                <h4 className='green'>Pet Sitting</h4>
                                <p>Find a student pet-lover to take your furry friend out for a long walk. </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='taskBox'>
                            {/* <div className='boxImg'><img src="/assets/images/home/t3.png" alt="" /></div> */}
                            <div className='boxImg'><img src="/assets/images/studentfreelance/Sports Coaching.svg" alt="" /></div>
                            <div className='taskBoxContent'>
                                <h4 className='green'>Sports Coaching</h4>
                                <p>Book a student-athlete for you child to improve athletic skills or just have fun.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='taskBox'>
                            {/* <div className='boxImg'><img src="/assets/images/home/t4.png" alt="" /></div> */}
                            <div className='boxImg'><img src="/assets/images/studentfreelance/Moving.svg" alt="" /></div>
                            <div className='taskBoxContent'>
                                <h4 className='green'>Moving</h4>
                                <p>Find a student to carry heavy boxes and furniture to prepare your new home.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    {/*  */}
                    <SwiperSlide>
                        <div className='taskBox'>
                            {/* <div className='boxImg'><img src="/assets/images/home/t5.png" alt="" /></div> */}
                            <div className='boxImg'><img src="/assets/images/studentfreelance/Child Care.svg" alt="" /></div>
                            <div className='taskBoxContent'>
                                <h4 className='green'>Child Care</h4>
                                <p>Get a babysitter to look after your child, while you focus on other daily activities.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='taskBox'>
                            {/* <div className='boxImg'><img src="/assets/images/home/t6.png" alt="" /></div> */}
                            <div className='boxImg'><img src="/assets/images/studentfreelance/Eldercare.svg" alt="" /></div>
                            <div className='taskBoxContent'>
                                <h4 className='green'>Eldercare</h4>
                                <p>Let a student-courier bring groceries and other items to your doorstep.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='taskBox'>
                            {/* <div className='boxImg'><img src="/assets/images/home/t7.png" alt="" /></div> */}
                            <div className='boxImg'><img src="/assets/images/studentfreelance/Yard Work.svg" alt="" /></div>
                            <div className='taskBoxContent'>
                                <h4 className='green'>Yard Work</h4>
                                <p>Let a student water plants, remove dirt or mow the lawn in your backyard. </p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div>
                <Link to="/all-students" className='primary viewAllbtn mt-22px'>Get Started</Link>
            </div>
        </div>
    )
}

export default FreelanceTaskResponsive