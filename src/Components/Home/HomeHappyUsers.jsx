import { Col, Container, Row } from 'react-bootstrap'
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import HappyUsers from './HappyUsers';

function HomeHappyUsers() {
    return (
        <div className='homeUsers'>
            <div className='profileHead widthHomeR'>
                <h2>What Our Happy <span className='green'>Users Say</span></h2>
                <h6 className='subhead'>We take trust and safety seriously and provide only reliable college students. </h6>
            </div>
            <Container>
                <div className='homeUserSlidr homeUserSlidrResponsive remove'>
                    <Swiper
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                        }} 
                        slidesPerView={3}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        <SwiperSlide> <HappyUsers /></SwiperSlide>
                        <SwiperSlide> <HappyUsers /></SwiperSlide>
                        <SwiperSlide> <HappyUsers /></SwiperSlide>
                        <SwiperSlide> <HappyUsers /></SwiperSlide>
                        <SwiperSlide> <HappyUsers /></SwiperSlide>
                        <SwiperSlide> <HappyUsers /></SwiperSlide>
                    </Swiper>
                </div>
            </Container>
        </div>
    )
}

export default HomeHappyUsers