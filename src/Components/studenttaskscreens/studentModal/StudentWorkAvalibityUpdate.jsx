import { useState , useEffect } from 'react' 
import { Col, Container, Row } from 'react-bootstrap'
import { Link , useNavigate } from 'react-router-dom'
import { updateStudentDetail } from '../../../services/studentdetails/UpdateStudentDetail';
import Swal from 'sweetalert2';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import { timeSlots , days } from '../../../services/availibility&timeslots/Availibility';
import { createAvailability } from '../../../services/availibility&timeslots/CreateAvailability';
import { DeleteUserAvailability } from '../../../services/availibility&timeslots/DeleteUserAvailability';

const StudentWorkAvalibityUpdate = (props) => {

    let navigate = useNavigate();
    
    const [loder, setLoder] = useState(true);

    useEffect(() => {
        getDaysFunc();
        getTimeFunc();
    }, []);

    // get working days
    const [workdays, setworkdays] = useState();
    const getDaysFunc = async () => {
        const response = await days();

        if (response.status === 200) {
            
            let order = { monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6, sunday: 7 };
            let daysArray = response.data;
            daysArray.sort(function (a, b) {
                return order[a.day] - order[b.day];
            });

            setworkdays(daysArray);
        } else {
            Swal.fire({
                title: response.data.message,
                timer: 1500,
                icon: "error",
                showConfirmButton: false,
            });
        }
    };

    // get timing slots
    const [timeSlot, setTimeSlot] = useState();

    const getTimeFunc = async () => {
        const response1 = await timeSlots();

        if (response1.status === 200) {
            setTimeSlot(response1.data);
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

    const optionTime = [];
    if (timeSlot?.length > 0) {
        timeSlot?.map((singleTime => {
            return optionTime.push({
                'label': singleTime?.slot,
                'value': singleTime.id
            })
        }))
    }

    const startValueDrop = timeSlot?.map((item) => {
                                    return (
                                        <option value={item.id}>{item?.slot}</option>
                                    );
                            });

    const handleOnClick = () =>{
        // console.log('handle on click')
    }

    // create start time dropdown
    const [startTimeSlot, setStartTimeSlot] = useState(timeSlot);


    // post Api
    const [start, setStart] = useState({
        slot: "",
        id: "",
    });
    const [end, setEnd] = useState();

    const [loader, setLoader] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [userSlots, setuserSlots] = useState(props.workAvaliblity);

    const makeArray = (dayID) => {

        let copyUseState = [...userSlots];
        if (start && end && (start != end)) {


            let toBeAdd = false;
            let countSameDaySlot = 0;
            copyUseState?.map((singleIndex) => {
                if ((singleIndex.start_time_slot_id == start || singleIndex.end_time_slot_id == end) && singleIndex.day_id == dayID) {
                    // debugger
                    toBeAdd = true;
                }
                if(singleIndex.day_id == dayID){
                    countSameDaySlot++  
                }
            });
            if(countSameDaySlot >= 3){
                toBeAdd = true;
            }

            if (!toBeAdd) {
                // Find the item to update and store it in new list

                copyUseState.push({
                    start_time_slot_id: start,
                    end_time_slot_id: end,
                    day_id: dayID,
                    user_id: JSON.parse(localStorage.getItem("sparrowSignIn")).user.id,
                })

                setuserSlots(copyUseState)

            }
            // Set the previous list to the new list
        }
    };


    // console.log("useState: ", userSlots);

    const onSubmit = async (fData) => {

        // debugger
        setLoader(true);

        const data = {
            availabilities: userSlots,
        };
        // console.log("data: ", data);
        //
        if(props.workAvail){
            
            const resp1 = await DeleteUserAvailability(JSON.parse(localStorage.getItem("sparrowSignIn")).user.id)
            
        }

        const resp = await createAvailability(userSlots)
        if (resp.status === 200) {
            Swal.fire({
                title: "work details has been added!",
                timer: 1500,
                icon: 'success',
                showConfirmButton: false,
            })

            setLoader(false)
            // navigate('/signUpRoute/step-four');
        }
        else {
            Swal.fire({
                title: resp.data.message,
                timer: 3500,
                icon: 'error',
                showConfirmButton: false,
            })
        }
        props.modalDone()
    };

    const searchtimeID = (nameKey, myArray) => {
        // debugger
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].id == nameKey) {
                return myArray[i].slot;
            }
        }
    };

    const removeValueFromArray = (index_single, day_id) => {
        let copyUseState = [...userSlots];
        copyUseState.splice(index_single, 1)

        setuserSlots(copyUseState);
    };

    return (
        <div>
            <Modal
                size="lg"
                show='true'
                onHide={props.onClose}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Edit <span className='green'>Details</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='modalBodyTimeAvalible'>
                    <div>
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
                            <div className="setLower2">
                                
                                <div className="block-img-mb mb-head-img">
                                    <img src="/assets/images/Ellipse511.png" alt="123" />
                                </div>
                                
                                <form
                                    id='updateStudentWorkAvalibityForm'
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="SignupConfirmEmail stepForm"
                                >
                                    <div className="stepOne">
                                        
                                        {workdays?.map((item) => {
                                            return (
                                                <div className="mb35 timeSlotD">
                                                    <div className="workPoint">
                                                        <div className="state">
                                                            <label>
                                                                {item?.day.charAt(0).toUpperCase() +
                                                                    item?.day.slice(1)}
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {errors.dayId && <span className="eror">Select Day</span>}
                                                    <div className="mbl-mb-time">
                                                        <label className="displaynone-mb-551" htmlFor="appt">
                                                            Time of day:
                                                        </label>
                                                    </div>
                                                    <div className="workingTime justifyNone time-mb-select">
                                                        <div className="mb-time-zone">
                                                            <label className="displaynone-mb" htmlFor="appt">
                                                                Select a time:
                                                            </label>
                                                            <Select
                                                                className='timingInput_select mb-time-1 d-inline-block'
                                                                options={optionTime}
                                                                placeholder='Select ...'
                                                                onChange={(e) => {
                                                                    setStart(e.value)
                                                                }}
                                                                value={start.value && start}
                                                            />
                                                            {/* starttime */}
                                                            {/* {...register("startTime")} */}
                                                            {/* <select
                                                                className="timingInput mb-time-1"
                                                                onChange={(e) => {
                                                                    setStart(e.target.value);
                                                                }}
                                                            >
                                                                <option value="" disabled selected>
                                                                    Select
                                                                </option>
                                                                ;
                                                                {startValueDrop}
                                                            </select>
                                                            {errors.startTime && (
                                                                <span className="eror">This field is required</span>
                                                            )} */}
                                                            {/* entime */}
                                                            {/* <select
                                                                className="timingInput mb-time-1"
                                                                onChange={(e) => {
                                                                    setEnd(e.target.value);
                                                                }}
                                                            >
                                                                <option value="" disabled selected>
                                                                    Select
                                                                </option>
                                                                ;
                                                                {timeSlot?.map((item) => {
                                                                    return (
                                                                        <option value={item?.id}>{item?.slot}</option>
                                                                    );
                                                                })}
                                                            </select>
                                                            {errors.endTime && (
                                                                <span className="eror">This field is required</span>
                                                            )} */}
                                                            <Select
                                                                className='timingInput_select mb-time-1 d-inline-block'
                                                                options={optionTime}
                                                                placeholder='Select ...'
                                                                onChange={(e) => {
                                                                    setEnd(e.value)
                                                                }}
                                                                value={end?.value && end}
                                                            />
                                                        </div>
                                                        <div className="workingTimeSecndImg">
                                                            <img
                                                                className="workingTimeSecndImg"
                                                                src="/assets/images/customerDashboard/plusgroup.svg"
                                                                alt=""
                                                                onClick={() => {
                                                                    makeArray(item?.id);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="timingBox w-100">
                                                        <>
                                                            {userSlots?.map((parentObjArray, index) => {
                                                                return (
                                                                    <>
                                                                        {parentObjArray?.day_id === item?.id ? (
                                                                            <>

                                                                                <div className="timeSlotPills">
                                                                                    {searchtimeID(
                                                                                        parentObjArray.start_time_slot_id,
                                                                                        timeSlot
                                                                                    )}{" "}
                                                                                    -{" "}
                                                                                    {searchtimeID(
                                                                                        parentObjArray.end_time_slot_id,
                                                                                        timeSlot
                                                                                    )}{" "}
                                                                                    <span
                                                                                        style={{
                                                                                            color: "white",
                                                                                            cursor: "pointer",
                                                                                        }}
                                                                                        onClick={() =>
                                                                                            removeValueFromArray(
                                                                                                index,
                                                                                                item?.id
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        &#x2715;
                                                                                    </span>{" "}
                                                                                </div>

                                                                            </>
                                                                        ) : (
                                                                            <>

                                                                            </>
                                                                        )}
                                                                    </>
                                                                );
                                                            })}
                                                        </>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        
                                    </div>
                                </form>
                                {/* <LowerCircle /> */}
                            </div>
                        )}
                    </div>  


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClose}> Close </Button>
                    {/* <input form='my-form' type="submit" value="Continue" className='primary gender-mb-1' /> */}
                    <Button form='updateStudentWorkAvalibityForm' className='btn btn-success gender-mb-1  gender-mb-1' type="submit" >Update</Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default StudentWorkAvalibityUpdate