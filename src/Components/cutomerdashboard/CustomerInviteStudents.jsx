import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { ShowAllStudents } from '../../services/users/ShowAllStudents'
import AdvacnceSearchBar from '../advancesearchbar/AdvacnceSearchBar'
import StudentInviteCard from './customerinvitecards/StudentInviteCard'

const CustomerInviteStudents = () => {
    const [loder, setLoder] = useState(true);
    // student role 
    const student_role = 2;

    // get all Students
    const [allStudent, setAllStudent] = useState([]);

    const getAllStudentFunc = async () => {
        const response1 = await ShowAllStudents(student_role);

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
    };
    useEffect(() => {
        getAllStudentFunc();
    }, []);

    const handleViewStudent = (studentArray) => {
        // console.log("inviteStudent from search")
        setAllStudent(studentArray);
    }

    return (
        <>
            {
                loder ?
                    <div className="height100vh height10vh" >
                        < div className="lds-spinner" >
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
                        </div >
                    </div >
                    :
                    <div className='viewAllStudents'>
                        <Container className='text-center pl90'>
                        {/* <Container className='text-center ml90'> */}

                            <h2 className='mt140'>View All <span className='green'>Students</span></h2>
                            <AdvacnceSearchBar  updateStudentResult={handleViewStudent}/>
                            <Row className='mL50p viewAllStCards'>
                                {allStudent?.map((singleStd ,index) => {
                                    return (
                                        <>
                                            <Col md={4} className='mb-5'>
                                                <StudentInviteCard studentData={singleStd} key={index}/>
                                            </Col>
                                        </>
                                    )
                                })}
                            </Row>
                        </Container>
                    </div>
            }
        </>
    )
}

export default CustomerInviteStudents