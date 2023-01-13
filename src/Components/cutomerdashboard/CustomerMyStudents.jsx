import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { getAllSaveStudents } from '../../services/savestudents/GetAllStudents'
import StudentProfileCard from '../Home/StudentProfileCard'
import FooterNav from '../mobilefooternav/FooterNav'
import MyStudentsHeading from './MyStudentsHeading'

const CustomerMyStudents = () => {
    const [loder, setLoder] = useState(true);

    const bookNow = "Book Now";

    const [allStudent, setAllSStudent] = useState([]);
    let client_id = JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id;

    const getAllStudentFunc = async () => {
        const response1 = await getAllSaveStudents(client_id);

        if (response1.status === 200) {
            setAllSStudent(response1?.data?.student);
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
        getAllStudentFunc();
    }, []);

    return (
        <div>
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
            ) : <>
                <Container className='text-center'>
                    <MyStudentsHeading />
                    <Row className='marginForDashboard myDtudents'>
                        {allStudent?.length <= 0 ?
                            <div className='notification'>
                                <p className='notificationP text-dark py-md-2'>
                                    No Current Saved Student.
                                </p>
                            </div>
                            :
                            <>
                                {allStudent?.map((singleStd) => {
                                    return (
                                        <Col md={4}>
                                            <StudentProfileCard studentData={singleStd} bookNow={bookNow} setSavedStudents={setAllSStudent} />
                                        </Col>
                                    )
                                })}
                            </>
                        }
                    </Row>
                </Container>
                <FooterNav />
            </>
            }
        </div>
    )
}

export default CustomerMyStudents