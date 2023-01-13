import React, { useContext, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { days, timeSlots } from '../../services/availibility&timeslots/Availibility'
import { getLocations } from '../../services/locations/Locations'
import { createTaskAvalability } from '../../services/taskavailability/CreateTaskAvalability'
import { createTask } from '../../services/tasks/CreateTasks'
import FooterNav from '../mobilefooternav/FooterNav';
import Select from "react-select";
import AsyncSelect from 'react-select/async';
// import { v4 as uuidv4 } from 'uuid';
import { createOrder } from '../../services/order/CreateOrder'
import { createNotification } from '../../services/notifications/CreateNotification'
import { sendNotification } from '../../services/notifications/SendNotification'
// import { addDoc, collection, getDocs, query, where, Timestamp, getFirestore } from 'firebase/firestore'
// import { initializeApp } from 'firebase/app'
// import { firebaseConfig } from '../../firebase/FireBase'
// import { createChatRoom } from './customerinvitecards/CreatingChatRoom'
import { inviteStudent } from '../../services/invitestudents/InviteStudent'
import AuthContext from '../../context/AuthContext'

const CustomerCreateTask = () => {
    let { studentId, fcmToken } = useParams();
    // firebase
    // const appNew = initializeApp(firebaseConfig);
    // const dbNew = getFirestore(appNew);

    let navigate = useNavigate();
    const [loder, setLoder] = useState(true)
    // clientId
    let client_id = JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id;
    let client_Name = JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.first_name;
    // console.log(client_Name);
    // const Client_string = JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id.toString();
    // const student_string = JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id.toString()

    //select  recurring or not 0 for not 1 for recuring
    const [taskType, setTaskType] = useState("0");
    const [showEndDate, setShowEndDate] = useState(false);

    const selectGender = (e) => {
        setTaskType(e.target.value)

        if (e.target.value == 1) {
            setShowEndDate(true)
        } else {
            setShowEndDate(false)
        }
    }
    // useEffect for updating button values of gender 
    useEffect(() => {
    }, [taskType])

    useEffect(() => {
        // locationsFunc();
        getDaysFunc();
        getTimeFunc();
    }, []);

    const auth = useContext(AuthContext);
    // get locations
    // const [locations, setlocations] = useState([])
    // const locationsFunc = async () => {
    //     const resp = await getLocations();
    //     setlocations(resp.data)
    // }

    // get working days
    const [workdays, setworkdays] = useState();
    const getDaysFunc = async () => {
        const response = await days();

        if (response.status === 200) {
            setworkdays(response?.data);
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
    // adding time in days
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    // adding time in belw array
    const [timeArray, setTimeArray] = useState([]);

    const makeArray = (dayId) => {

        if (start !== end) {

            let toBeAdd = false;
            const alreadyAdded = timeArray.some(el => el.day_id === dayId)
            if (alreadyAdded) {
                toBeAdd = true;
            }
            timeArray?.forEach((item) => {
                if ((start === item.start_time_slot_id || end === item.end_time_slot_id) && item.day_id == dayId) {
                    toBeAdd = true
                }
            })

            if (!toBeAdd) {
                const newTimeArray = [...timeArray];
                newTimeArray.push({
                    day_id: dayId,
                    start_time_slot_id: start,
                    end_time_slot_id: end
                })
                setTimeArray(newTimeArray);
            }
        }

    }

    // getting timing accordingly
    const searchtimeID = (nameKey, myArray) => {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].id == nameKey) {
                return myArray[i].slot;
            }
        }
    };
    // remove from array
    const removeValueFromArray = (index_single, day_id) => {
        let copyUseState = [...timeArray];
        copyUseState.splice(index_single, 1)
        setTimeArray(copyUseState);
    };


    // const optionlocation = [];
    // if (locations.length > 0) {
    //     locations.map((singleLocation => {
    //         return optionlocation.push({
    //             'label': singleLocation.city + ',' + singleLocation.zip,
    //             'value': singleLocation.id
    //         })
    //     }))
    // }

    const optionTime = [];
    if (timeSlot?.length > 0) {
        timeSlot?.map((singleTime => {
            return optionTime.push({
                'label': singleTime?.slot,
                'value': singleTime.id
            })
        }))
    }

    const filterLocationOption = (inputValue) => {
        if (inputValue.length > 2) {
            return auth.locations?.filter((i) =>
                i.label.toLowerCase().includes(inputValue.toLowerCase())
            );
        } else {
            let result = auth.locations.filter((i) =>
                i.label.toLowerCase().includes(inputValue.toLowerCase())
            );
            return result.splice(0, 80)
        }
    };

    const loadOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(filterLocationOption(inputValue));
        }, 1000);
    };

    // api function

    function verifyDate(date) {
      
        var ToDate = new Date();
    
        if (new Date(date).getTime() <= ToDate.getTime()) {
            return '';
        }
        return date;
    }

    const [btnLoder, setBtnLoder] = useState(false)

    const { control, register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (fData) => {
        setBtnLoder(true)
        const data = {
            user_id: client_id,
            location: parseInt(fData.location.value),
            title: fData.task,
            type: parseInt(taskType),
            hourly_rate: parseInt(fData.payRate),
            description: fData.description,
            start_date: fData.date
        }
        const resp = await createTask(data)
        if (resp.status === 200) {
            Swal.fire({
                title: resp.data.message,
                timer: 1500,
                icon: 'success',
                showConfirmButton: false,
            })
            const idOfTask = resp?.data?.task?.id
            // adding task id in timeArray
            timeArray.forEach(object => {
                object.task_id = idOfTask
            })
            // again api hit
            if (timeArray.length > 0) {
                const resp1 = await createTaskAvalability(timeArray);

                if (resp1.status === 200) {
                    // setTimeout(() => {
                    //     Swal.fire({
                    //         title: resp1.data.message,
                    //         timer: 1500,
                    //         icon: 'success',
                    //         showConfirmButton: false,
                    //     })
                    // }, 1500);

                    // creating order
                    const data = {
                        task_id: idOfTask,
                        student_id: parseInt(studentId),
                        client_id: client_id,
                        status: 0,
                        tip: null,
                        hours_billed: null
                    }
                    const respOfOrder = await createOrder(data)

                    // creating notifiaction for All notififcation tab

                    if (respOfOrder.status === 200) {
                        const data1 = {
                            // as reqirement by backend type is 0
                            type: 0,
                            to_id: parseInt(studentId),
                            from_id: client_id,
                            data: {
                                title: "Order Recieved",
                                message: `Order Recieved from ${client_Name}.Click to proceed`, action_url: `/dashboardRoute/chatStudent/student-task-descp/${idOfTask}/${respOfOrder?.data?.order?.id}`
                            },
                            read_at: null
                        }   
                        const resp = await createNotification(data1)
                        // send notification
                        const data = {
                            fcmToken: fcmToken,
                            title: "Order Recieved",
                            body: `Order Recieved from ${client_Name}`
                        }
                        const respOfNotification = await sendNotification(data)


                        // creating chatRoom and sending notiifcaiton in chat
                        // let std_String = studentId.toString()
                        // createChatRoom(std_String, Client_string, idOfTask, respOfOrder?.data?.order?.id)


                        // status
                        if (respOfNotification.status === 200) {
                            // creating invite students number for record
                            const data = {
                                task_id: idOfTask,
                                client_id: client_id,
                                student_id: parseInt(studentId)
                            }
                            const response = await inviteStudent(data)
                            if (response.status === 200) {
                                setTimeout(() => {
                                    Swal.fire({
                                        title: "Notification Sent",
                                        timer: 1500,
                                        icon: 'success',
                                        showConfirmButton: false,
                                    })
                                }, 1500);
                                setTimeout(() => {
                                    navigate(`/dashboardRoute/all-students/invite-students/${idOfTask}/${respOfOrder?.data?.order?.id}`);
                                }, 2700);
                                // }, 4200);
                            }
                        }
                    }
                } else {
                    Swal.fire({
                        title: resp1.data.message,
                        timer: 3500,
                        icon: 'error',
                        showConfirmButton: false,
                    })
                    setBtnLoder(false)
                }
            }
            else {
                Swal.fire({
                    title: "Please add timeslots",
                    timer: 3500,
                    icon: 'error',
                    showConfirmButton: false,
                })
                setBtnLoder(false)
            }
        } else {
            Swal.fire({
                title: resp.data.message,
                timer: 3500,
                icon: 'error',
                showConfirmButton: false,
            })
            setBtnLoder(false)
        }
    }

    return (
        <div>
            {
                loder ? (
                    <div style={{ height: "100vh" }} className="height100vh" >
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
                    </div >
                ) : (
                    <div className='customerCreateTask customerContainer'>
                        <h2 className='mt78 textCenter'>Create Your <span className='green'>Task</span></h2>
                        <div className='taskForm'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='mb24'>
                                    <p className='mb-2 tasksHed'>Task</p>
                                    <div>
                                        <input placeholder='E.g. Foothill College' className='taskField' type="text" {...register("task", { required: true })} />
                                    </div>
                                    {errors.task && <span className='eror'>This field is required</span>}
                                </div>
                                <div className='mb24'>
                                    <p className='mb-2 tasksHed'>Time Frame</p>
                                    <div className='qParts'>
                                        <div className='pOptions d-flex'>
                                            <div className='selectGEndrDiv jobSelection'>
                                                <input type="radio" value="0" onChange={selectGender} id='radioMale' checked={taskType === "0"} />
                                                <label htmlFor="radioMale" className='gender-mb setColor oneTimeJob'>One-time job
                                                    <span className="hoverTextForOneTime">Choose the days in the week that you want our student to help. The task will end after the last day in the week.</span>
                                                </label>
                                            </div>
                                            <div className='selectGEndrDiv jobSelection'>
                                                <input type="radio" value="1" onChange={selectGender} id="radioFemale" checked={taskType === "1"} />
                                                <label htmlFor="radioFemale" className='gender-mb setColor recuringJobLabel'>Recurring job
                                                    <span className="hoverTextForRecurring">Choose the days in the week that you want our student to help. The task will reoccur every week until the end date is reached.</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='mb24 d-flex justify-content-between'>
                                    <div>
                                        <p className='mb-2 tasksHed'>Start Date</p>
                                        <div>
                                            <input className='taskField wd50 Clender w-100' type="date" {...register("date", { required: true  , setValueAs: v => verifyDate(v)   })} />
                                        </div>
                                      
                                        {errors.date && (errors.date?.ref?.value ? <span className='eror'>Date must be greater then today.</span> : <span className='eror'>This field is required.</span> ) }
                                    </div>
                                    {showEndDate && <div>
                                        <p className='mb-2 tasksHed'>End Date</p>
                                        <div>
                                            <input className='taskField wd50 Clender w-100' type="date" {...register("EndDate", { required: true , setValueAs: v => verifyDate(v)  })} />
                                        </div>
                                        {errors.EndDate && (errors.EndDate?.ref?.value ? <span className='eror'>Date must be greater then today.</span> : <span className='eror'>This field is required.</span> ) }
                                    </div>
                                    }
                                </div>

                                {/* showing mutliple days */}
                                {workdays?.map((item) => {
                                    return (
                                        <div className='mb24'>
                                            <p className='mb-2 tasksHed'>{item?.day.charAt(0).toUpperCase() +
                                                item?.day.slice(1)}</p>
                                            <div>

                                                <Select
                                                    className='timingInput_select mb-time-1 d-inline-block task_select'
                                                    options={optionTime}
                                                    placeholder='Select ...'
                                                    onChange={(e) => {
                                                        setStart(e.value)
                                                    }}
                                                    value={start?.value && start}
                                                />
                                                &nbsp;
                                                <span style={{ color: "#C4C4C4" }}>-</span>&nbsp;

                                                <Select
                                                    className='timingInput_select mb-time-1 d-inline-block task_select'
                                                    options={optionTime}
                                                    placeholder='Select ...'
                                                    onChange={(e) => {
                                                        setEnd(e.value)
                                                    }}
                                                    value={end?.value && end}
                                                />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                {/*add time function calls on below */}
                                                <img src="/assets/images/heavyImg/ADDICOn.svg" alt=""
                                                    onClick={() => {
                                                        makeArray(item?.id);
                                                    }}
                                                />
                                            </div>
                                            <div className="timingBox padding0">
                                                <div className='daysSpace px-3 text-center'>
                                                    {/* {item?.day.charAt(0).toUpperCase() +
                                                        item?.day.slice(1)} */}
                                                    Est. Time
                                                </div>
                                                <div className='dayTImes taskTimeSlot'>
                                                    {timeArray?.map((parentObjArray, index) => {
                                                        return (
                                                            <>
                                                                {parentObjArray?.day_id === item?.id ? (
                                                                    <>

                                                                        <div className="timeSlotPills taskTimePills">
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
                                                                    <></>
                                                                )}
                                                            </>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                {/* <div className='mb24'>
                                    <button type='button' className='primary addDayBtn'>Add Day</button>
                                </div> */}
                                <div className='mb24 d-flex'>
                                    <div className='wd30 hourlyPayMobile'>
                                        <p className='mb-2 tasksHed'>Hourly Pay</p>
                                        <div className='DollarSign'>
                                            <input className='taskField' placeholder='00.00' type="number" step="0.01" {...register("payRate", { required: true })} />
                                        </div>
                                        {errors.payRate && <span className='eror'>This field is required</span>}
                                    </div>
                                    <div className='wd70 ml-24 locationDivMobile'>
                                        <p className='mb-2 tasksHed'>Location</p>
                                        <div>

                                            <Controller
                                                name="select"
                                                control={control}
                                                {...register("location", { required: true })}
                                                render={({ field }) =>
                                                    <AsyncSelect {...field} className="StepOneSelect createTaskLocation font15" cacheOptions loadOptions={loadOptions} defaultOptions={auth.locations.slice(0, 50)} placeholder='Select Location' />
                                                }
                                            />
                                        </div>
                                        {errors.location && <span className='eror'>This field is required</span>}
                                    </div>
                                </div>
                                <div className='mb24 mb0'>
                                    <p className='mb-2 tasksHed'>Task Discription</p>
                                    <textarea name="" id="" className='taskField setHeghtMessage' placeholder='Describe what you need help with' {...register("description", { required: true })} />
                                </div>
                                {errors.description && <span className='eror'>This field is required</span>}
                                <div className='mb24 mt-5'>
                                    {btnLoder ?
                                        <div className="relative">
                                            <div className="loader alignLoader"></div>
                                            <input value="Create Task" className='primary createTaskBtn' />
                                        </div>
                                        :
                                        <input type="submit" value="Create Task" className='primary createTaskBtn' />
                                    }
                                </div>
                            </form>
                        </div>
                        <div>
                            <FooterNav />
                        </div>
                    </div>
                )}
        </div>
    )
}

export default CustomerCreateTask