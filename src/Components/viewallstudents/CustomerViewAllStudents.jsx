import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import AdvacnceSearchBar from '../advancesearchbar/AdvacnceSearchBar'
import StudentProfileCard from '../Home/StudentProfileCard'
import Footer from '../navbarfooter/Footer'
import { ShowAllStudents } from '../../services/users/ShowAllStudents';
import Swal from "sweetalert2";
import FooterNav from '../mobilefooternav/FooterNav'

const CustomerViewAllStudents = () => {

    const [loder, setLoder] = useState(true);
    // student role 
    const student_role = 2;
    // for cleint id on which we check saved students
    let ClientId = (JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id)
    // get all Students
    const [allStudent, setAllStudent] = useState([]);

    const getAllStudentFunc = async () => {
        // debugger
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
    };
    useEffect(() => {
        getAllStudentFunc();
    }, []);
  
    const handleViewStudent = (studentArray) => {
        // console.log("testing customerViewallStudents")
        setAllStudent(studentArray);
    }

    const [isSaved, setIsSaved] = useState(true)

    const bookNow = "Book Now"
    return (
        <>
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
            ) : (
                <div className='viewAllStudents'>
                    <Container className='text-center pl90'>
                    {/* <Container className='text-center'> */}
                        <h2 className='mt70'>View All <span className='green'>Students</span></h2>
                        <AdvacnceSearchBar updateStudentResult={handleViewStudent}/>
                        {/* ShowAllStudents */}
                        <Row className='viewAllStCards'>
                            {allStudent?.map((singleStd) => {
                                return (<>
                                    <Col md={4} className='mb-5'>
                                        <StudentProfileCard isSaved={isSaved} bookNow={bookNow} studentData={singleStd} setAllStudent={setAllStudent} />
                                    </Col>
                                </>
                                )
                            })}
                        </Row>
                    </Container>
                </div>
            )
            }
            <FooterNav />
        </>
    )
}

export default CustomerViewAllStudents