import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";

import {
    days,
    timeSlots,
} from "../../../services/availibility&timeslots/Availibility";
import { createAvailability } from "../../../services/availibility&timeslots/CreateAvailability";

import LowerCircle from "../LowerCircle";

const StepTwo = () => {

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
            daysArray.sort( (a, b) => {
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

    const [userSlots, setuserSlots] = useState([]);

    const makeArray = (dayID) => {

        let copyUseState = [...userSlots];
        if (start != end) {

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
        }
    };

    const onSubmit = async (fData) => {
        setLoader(true);

        const data = {
            availabilities: userSlots,
        };


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
            navigate('/signUpRoute/profile-done');
        }
        else {
            Swal.fire({
                title: resp.data.message,
                timer: 3500,
                icon: 'error',
                showConfirmButton: false,
            })
        }

        setLoader(false);
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
    // fill out later
    const handleChange = (e) => {
        let isChecked = e.target.checked;
        if (isChecked) {
            setTimeout(() => {
                // navigate('/signUpRoute/step-four');
                navigate('/signUpRoute/profile-done');
            }, 200);
        }
    }
    return (
        // work avalilibity
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
                    <div className="mb-green-arrow">
                        <Link to="/signUpRoute/step-two">
                            <img src="./assets/images/Vector_backIcon.svg" alt="" />
                        </Link>
                    </div>
                    <div className="block-img-mb mb-head-img">
                        <img src="/assets/images/Ellipse511.png" alt="123" />
                    </div>
                    {/* desktopStep */}
                    <div className='stOneDiv setResonive'>
                        <img src="/assets/images/offer/stepThreeDesktop.svg" alt="" />
                    </div>
                    {/* mobileStep */}
                    <div className='stOneDivResp setResonive1'>
                        <img src="/assets/images/offer/stepThreeMobile.svg" alt="" />
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="SignupConfirmEmail stepForm"
                    >
                        <div className="stepOne">
                            <h2>Work Availability</h2>

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
                                        <div className="workingTime stepPageWorkAvail justifyNone time-mb-select">
                                            <div className="mb-time-zone">
                                                <label className="displaynone-mb" htmlFor="appt">
                                                    Select a time:
                                                </label>
                                                {/* starttime */}
                                               
                                                <Select
                                                    className='timingInput_select mb-time-1 d-inline-block'
                                                    options={optionTime}
                                                    placeholder='Select ...'
                                                    onChange={(e) => {
                                                        setStart(e.value)
                                                    }}
                                                    value={start.value && start}
                                                />

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
                                        <div className="timingBox">
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

                            <div className="formCheck">
                                <div className="pretty p-svg p-curve">
                                    <input onChange={(e) => handleChange(e)} type="checkbox" />
                                    <div className="state p-success">
                                        <svg className="svg svg-icon" viewBox="0 0 20 20">
                                            <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>
                                        </svg>
                                        <label>Fill out later</label>
                                    </div>
                                </div>
                            </div>

                            <div className="formBtnSet">
                                <Link
                                    to="/signUpRoute/step-two"
                                    className="backBtn displaynone-mb"
                                >
                                    Back
                                </Link>
                                {loader ? (
                                    <div className="relative stepLoderAlign">
                                        <div className="loader alignLoader"></div>
                                        <input
                                            type="submit"
                                            className="backBtn ctn pl40"
                                            disabled
                                            value="Continue"
                                        />
                                    </div>
                                ) : (
                                    <input
                                        type="submit"
                                        className="backBtn ctn"
                                        value="Continue"
                                    />
                                )}
                            </div>
                        </div>
                    </form>
                    <LowerCircle />
                </div>
            )}
        </div>
    );
};

export default StepTwo;