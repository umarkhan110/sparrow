import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import AdvacnceSearchBar from '../advancesearchbar/AdvacnceSearchBar'
import StudentProfileCard from '../Home/StudentProfileCard'
import Footer from '../navbarfooter/Footer'
import { ShowAllStudents } from '../../services/users/ShowAllStudents';
import Swal from "sweetalert2";
import { useLocation } from 'react-router'

const ViewAllStudents = () => {


    const [loder, setLoder] = useState(true);
    // student role 
    const student_role = 2;
    // for cleint id on which we check saved students
    let ClientId = (JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id)

    // get all Students
    const { state } = useLocation();
    const [allStudent, setAllStudent] = useState(state?.query ? state?.query : []);

    // console.log(state);
    if (state?.hasOwnProperty('query')) {
        window.history.replaceState({}, document.title)
    }

    const getAllStudentFunc = async () => {
        if (!state?.hasOwnProperty('query')) {
            const response1 = await ShowAllStudents(student_role, ClientId);

            if (response1.status === 200) {
                setAllStudent(response1.data.users);
                setLoder(false);

            } else {
                Swal.fire({
                    title: response1.data.message,
                    timer: 1500,
                    icon: "error",
                    showConfirmButton: false,
                });
            }
        } else {
            setLoder(false);
        }
    };
    useEffect(() => {
        getAllStudentFunc();
    }, []);


    const handleViewStudent = (studentArray) => {
        // console.log("viewallStudent from search")
        setAllStudent(studentArray);
        const element = document.getElementById('allStudentSection');
        if (element) {
        // 👇 Will scroll smoothly to the top of the next section
        element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const bookNow = "Book Now"
    return (
        <>
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
                <div className='viewAllStudents'>
                    <Container className='text-center'>
                        <h2 className='mt70'>View All <span className='green'>Students</span></h2>

                        <AdvacnceSearchBar
                            updateStudentResult={handleViewStudent}
                            valueFromHome={state?.defaultValue?.taskInputValue}
                        />
                        {/* ShowAllStudents */}
                        <Row className='viewAllStCards' id="allStudentSection">
                            {allStudent?.map((singleStd, index) => {
                                return (<>
                                    <Col key={index} md={4} className='mb-5'>
                                        <StudentProfileCard bookNow={bookNow} studentData={singleStd} setAllStudent={setAllStudent} />
                                    </Col>
                                </>
                                )
                            })}
                        </Row>
                    </Container>
                </div>
            )
            }
        </>
    )
}

export default ViewAllStudents