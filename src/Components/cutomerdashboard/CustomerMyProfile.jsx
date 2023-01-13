import { useState, useEffect } from 'react';
import { Col, Container, ModalHeader, Row } from 'react-bootstrap'
import FooterNav from '../mobilefooternav/FooterNav';
import CustomerTaskHistory from "./CustomerTaskHistory";
// import { Link, useNavigate } from 'react-router-dom'
import { showStudent } from '../../services/users/ShowSingleStudent';
// import { getLocations } from '../../services/locations/Locations';
import CustomerUpdate from './customerModal/CustomerUpdate';
import BankDetailModal from '../modals/BankDetailModal';
import AddConnectsModal from '../modals/AddConnectsModal';
import { verificationAccount } from '../../services/authentication/VerificationNotification';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
// import Swal from 'sweetalert2';

const CustomerMyProfile = () => {

    let navigate = useNavigate();

    const [updateContent, setUpdateContent] = useState(false);
    const [clientDetail, setClientDetails] = useState(false);

    // console.log(clientDetail?.totalSavedStudents)
    // declare the data fetching function
    const client_id = parseInt(JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id);

    const fetchData = async () => {
        const clientApiResponce = await showStudent(client_id);
        if (clientApiResponce.status === 200) {

            if(clientApiResponce.data.user.email_verified_at === null){
                Swal.fire({
                    title: 'Email is Not Verified!',
                    text: "Click yes, to visit verify email page.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#82d051',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Verify'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        const resp1 = verificationAccount(clientApiResponce?.data?.token)
                        setTimeout(() => {
                            Swal.fire({
                                title: "Email has been sent!",
                                timer: 1500,
                                icon: 'success',
                                showConfirmButton: false,
                            })
                        }, 1000);
        
                        setTimeout(() => {
                            navigate('/signUpRoute/confirm-email');
                        }, 2000);
                    }
                  })
            }
            
            setClientDetails(clientApiResponce.data.user);
        }
    }
    // geting total tasks value from child
    const [totaltasks, setTotaltasks] = useState();
    /** this is for student modal **/
    const [clientEditModal, setClientEditModal] = useState(false);
    const handleClientClose = () => setClientEditModal(false);
    /** this is end of student modal **/

    // get locations
    // const [locations, setlocations] = useState([])
    // const locationsFunc = async () => {
    //     const resp = await getLocations();
    //     setlocations(resp?.data)
    // }
    // useEffect(() => {
    //     locationsFunc()
    // }, [])

    // const updateHandler = () => {
    //     setClientDetails(false);
    //     setUpdateContent(true);
    // }

    useEffect(() => {
        fetchData();
    }, [updateContent, clientEditModal])


    return (

        <div className='bgNotiLines cMyProfile'>
            <Container>
                <h2 className='mb-5 text-center'>My <span className='green'>Profile</span></h2>
                <Row>
                    <Col md={4}>
                        <div className='studentDetails'>
                            <div className='studentDetailsImg'>
                                <img src={clientDetail?.image} alt="" />
                            </div>
                            <h5 className='upH5 mt-2'>
                                {clientDetail?.first_name?.charAt(0)?.toUpperCase() + clientDetail?.first_name?.slice(1)}
                                {clientDetail?.last_name && " " + clientDetail?.last_name.charAt(0).toUpperCase()}.
                                {/* {clientDetail?.first_name + ' ' + clientDetail?.last_name} */}
                            </h5>
                            <div className='studentContent mt-3 ml-20'>
                                {clientDetail?.location &&
                                    <div className='mb-3 block'>
                                        <img src="/assets/images/customerDashboard/lcoationvector.svg" alt="" />
                                        <span className='ml-3'>
                                            {clientDetail?.location?.city + ', ' + clientDetail?.location?.state}
                                        </span>
                                    </div>
                                }
                                <div className='mleft'>
                                    <img src="/assets/images/customerDashboard/verified-dashboar.svg" alt="" />
                                    <span className='ml-3'>{clientDetail?.email_verified_at !== null ? "Verified" : "Not Verified"}</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className='personalDetails mb-personal-detail position-relative'>
                            {/* <div className='PersonalDetailsHed'> */}
                            <h4>Personal Details</h4>

                            {clientEditModal && <CustomerUpdate onClose={handleClientClose} modalValue={clientEditModal} clientDetail={clientDetail} modalDone={() => setClientEditModal(false)} />}

                            <a style={{ cursor: 'pointer' }} onClick={() => setClientEditModal(true)}>
                                <img className='editImager' src="/assets/images/customerDashboard/editButtonModal.svg" alt="" />
                            </a>

                            {/* </div> */}
                            <Row className='PersonalDetailsHed mt-4'>
                                <Col md={6}>
                                    <div className='mb-4'>
                                        <p className='mb-1' style={{ color: "black" }}>Name</p>
                                        <p className='aboutContent'>
                                            {clientDetail?.first_name?.charAt(0)?.toUpperCase() + clientDetail?.first_name?.slice(1) + ' ' + clientDetail?.last_name?.charAt(0)?.toUpperCase() + clientDetail?.last_name?.slice(1)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className='mb-1' style={{ color: "black" }}>Location</p>
                                        <p className='aboutContent'>{clientDetail?.location ?
                                            // locations?.map((x) => {
                                            //     if (x?.id == clientDetail?.location?.id) {
                                            //         return x.city + ', ' + x.state + ' ' + x.zip
                                            //     }
                                            // })\
                                            clientDetail?.location?.city + ', ' + clientDetail?.location?.state + ' ' + clientDetail?.location?.zip
                                            : "No location available"}</p>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className='mb-4 mTop10'>
                                        <p className='mb-1' style={{ color: "black" }}>Email</p>
                                        <p className='aboutContent'>
                                            {clientDetail?.email}
                                        </p>
                                    </div>
                                    <div>
                                        <p className='mb-1' style={{ color: "black" }}>Phone Number</p>
                                        <p className='aboutContent'>
                                            {clientDetail?.phone}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className='paymentDetails mb-payment-detail mt-4'>
                            <div className='PersonalDetailsHed'>
                                <h4>Your Stats</h4>
                            </div>
                            <Row className='yourStatsDetails_client mt-4'>
                                <Col md={4}>
                                    <div className='mb-4'>
                                        <h5 className='mb-1' style={{ color: "black" }}>Students Invited </h5>
                                        <span>
                                            <img className='yourStats_client' src="/assets/images/customerDashboard/VectorPerson_icon.svg" alt="" />&nbsp;&nbsp;
                                            <p className='aboutContent d-inline-block'>
                                                {clientDetail?.totalSavedStudents} Students
                                            </p>
                                        </span>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className='mb-4 mTop10'>
                                        <h5 className='mb-1' style={{ color: "black" }}>Tasks Performed</h5>
                                        <span>
                                            <img className='yourStats_client' src="/assets/images/customerDashboard/VectorTask_icon.svg" alt="" />&nbsp;&nbsp;
                                            <p className='aboutContent d-inline-block'>
                                                {totaltasks} Tasks
                                            </p>
                                        </span>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className='mb-4 mTop10'>
                                        <h5 className='mb-1' style={{ color: "black" }}>Common Task</h5>
                                        <span>
                                            <img className='yourStats_client' src="/assets/images/customerDashboard/greenStar.svg" alt="" />&nbsp;&nbsp;
                                            <p className='aboutContent d-inline-block'>
                                                Babysitting
                                            </p>
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Row className='mx-2'>
                    <CustomerTaskHistory setTotaltasks={setTotaltasks} />
                </Row>

                {/* <BankDetailModal /> */}
            </Container>

            <div>
                <FooterNav />
            </div>
        </div>
    )
}

export default CustomerMyProfile