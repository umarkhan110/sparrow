import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import { getAllPrevHiredStudents } from '../../services/prevStudents/PrevStudent'
import FooterNav from '../mobilefooternav/FooterNav'
import MyStudentsHeading from './MyStudentsHeading'
import PreviousStudentCards from './PreviousStudentCards'

const CustomerPreviousStudent = () => {
    const [loder, setLoder] = useState(true);

    const [prevHiredStudent, setPrevHiredStudent] = useState([]);
    let client_id = JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id;

    const getPrevHiredStudentFunc = async () => {
        const response = await getAllPrevHiredStudents(client_id);

        if (response.status === 200) {
            setPrevHiredStudent(response?.data?.students);
            setLoder(false)
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
        getPrevHiredStudentFunc();
    }, []);

    // console.log(prevHiredStudent)

    return (
        <div>
            {loder ? <div className="height100vh height10vh">
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
            </div> :
                <Fragment>
                    <Container className='text-center'>
                        <MyStudentsHeading prevHierd='1' />

                        <Row className='marginForDashboard mb-5 myDtudents'>
                            {/* <Col md={4}>
                        <PreviousStudentCards />
                    </Col> */}
                            {prevHiredStudent?.map((singlePrevStd, index) => {
                                return (
                                    <Col md={4}>
                                        <PreviousStudentCards studentData={singlePrevStd} key={index} />
                                    </Col>
                                )
                            })}
                            {prevHiredStudent?.length <= 0 ?
                                <div className='notification'>
                                    <p className='notificationP text-dark py-md-2'>
                                        No Previously Hired Students.
                                    </p>
                                </div>
                                : null
                            }
                        </Row>
                    </Container>
                    <FooterNav />
                </Fragment>
            }

        </div>
    )
}

export default CustomerPreviousStudent