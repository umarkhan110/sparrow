import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import LowerCircle from '../LowerCircle'
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { updateStudentDetail } from '../../../services/studentdetails/UpdateStudentDetail';


const StepOne = () => {
    // navigation
    let navigate = useNavigate();
    const [loader, setLoader] = useState(false)
    // react select
    const style = {
        control: base => ({
            ...base,
            border: "1px solid #EAEFF3 !important",
            // This line disable the blue border
            boxShadow: "none",
            borderRadius: "15px",
            padding: "15px 24px",
            background: "#F8F8F8",
            color: "red"
        })
    };

    // change value
    // const optionValue = [
    //                         {
    //                             "label": "Yard Work",
    //                             "value": "Yard Work",
    //                         },{
    //                             "label": "Moving",
    //                             "value": "Moving",
    //                         },{
    //                             "label": "Grocery Delivery",
    //                             "value": "Grocery Delivery",
    //                         },{
    //                             "label": "Housekeeping",
    //                             "value": "Housekeeping",
    //                         },{
    //                             "label": "Pet Sitting",
    //                             "value": "Pet Sitting",
    //                         },{
    //                             "label": "Elder Care",
    //                             "value": "Elder Care",
    //                         },{
    //                             "label": "Window Cleaning",
    //                             "value": "Window Cleaning",
    //                         },{
    //                             "label": "Tutoring",
    //                             "value": "Tutoring",
    //                             // "options": [
    //                             //     { value: 'English', label: 'English', parent:'Tutoring' },
    //                             //     { value: 'Math', label: 'Math', parent:'Tutoring' },
    //                             //     { value: 'Chemistry', label: 'Chemistry', parent:'Tutoring' },
    //                             //     { value: 'History', label: 'History', parent:'Tutoring' },
    //                             //     { value: 'Religious Education', label: 'Religious Education', parent:'Tutoring' },
    //                             //     { value: 'Geography', label: 'Geography', parent:'Tutoring' },
    //                             // ]

    //                         },{
    //                             "label": "Sports Coaching",
    //                             "value": "Sports Coaching",
    //                             // "options": [
    //                             //     { value: 'Baseball', label: 'Baseball', parent:'Sports Coaching' },
    //                             //     { value: 'Soccer', label: 'Soccer', parent:'Sports Coaching' },
    //                             //     { value: 'Ice Hockey', label: 'Ice Hockey', parent:'Sports Coaching' },
    //                             //     { value: 'Tennis', label: 'Tennis', parent:'Sports Coaching' },
    //                             //     { value: 'Golf', label: 'Golf', parent:'Sports Coaching' },
    //                             //     { value: 'Boxing', label: 'Boxing', parent:'Sports Coaching' },
    //                             //     { value: 'American Football', label: 'American Football', parent:'Sports Coaching' },
    //                             // ]
    //                         },{
    //                             "label": "Other",
    //                             "value": "Other",
    //                         }
    //                     ]
    // change end value

    const options = [
        { value: 'Tutoring', label: 'Tutoring' },
        { value: 'Sports Coaching', label: 'Sports Coaching' },
        { value: 'Yard Work', label: 'Yard Work' },
        { value: 'Moving', label: 'Moving' },
        { value: 'Grocery Delivery', label: 'Grocery Delivery' },
        { value: 'Housekeeping', label: 'Housekeeping' },
        { value: 'Pet Sitting', label: 'Pet Sitting' },
        { value: 'Elder Care', label: 'Elder Care' },
        { value: 'Window Cleaning', label: 'Window Cleaning' },
        { value: 'Other', label: 'Other' }
    ]

    const [selectedOption, setSelectedOption] = useState([]);

    // ..................
    // sports options for select
    const [selectedSport, setSelectedSport] = useState([]);
    let newSelectedSport = selectedSport?.map((item => {
        return item.value
    }))
    let sportsValue = newSelectedSport.toString()

    const sportsOptions = [
        { value: 'Baseball', label: 'Baseball' },
        { value: 'Soccer', label: 'Soccer' },
        { value: 'Ice Hockey', label: 'Ice Hockey' },
        { value: 'Tennis', label: 'Tennis' },
        { value: 'Golf', label: 'Golf' },
        { value: 'Boxing', label: 'Boxing' },
        { value: 'American Football', label: 'American Football' },
    ]

    const [sportsSelected, setSportsSelected] = useState(false)

    // ..................
    // tutoring options for select

    const [selectedTutor, setSelectedTutor] = useState([]);
    let newSelectedTutor = selectedTutor?.map((item => {
        return item.value
    }))
    let tutorValue = newSelectedTutor.toString()

    const tutorOptions = [
        { value: 'English', label: 'English' },
        { value: 'Math', label: 'Math' },
        { value: 'Chemistry', label: 'Chemistry' },
        { value: 'History', label: 'History' },
        { value: 'Religious Education', label: 'Religious Education' },
        { value: 'Geography', label: 'Geography' },
    ]

    const [tutorSelected, setTutorSelected] = useState(false)

    // other option selected from dropdown
    const [otherSelected, setOtherSelected] = useState(false)


    //react select: converting array of object to 1 array of strings 
    //2nd step react select : converting value in format ----Yard Work,Sports Coaching,Tutoring--- to send in form
    let newValues = selectedOption?.map((item => {
        return item.value
    }))

    // let otherToBeShow = false;
    // const checkInPrimaryTask = (event) => {
    //     event.target.value.map((el) => {
    //       if(el.value === 'Other'){ 
    //         otherToBeShow = true
    //         setOtherSelected(true)
    //       }
    //     })
    //     if(!otherToBeShow){
    //         setOtherSelected(false)
    //     }
    // }

    useEffect(() => {
        // if(otherSelected){
        //     setOtherSelected(true)
        // } else {
        //     setOtherSelected(false)
        // }

        if (newValues?.includes("Other")) {
            setOtherSelected(true)
        } else {
            setOtherSelected(false)
        }
        // tutro check
        if (newValues?.includes("Tutoring")) {
            setTutorSelected(true)
        } else {
            setTutorSelected(false)
            setSelectedTutor([])
        }
        // sports check
        if (newValues?.includes("Sports Coaching")) {
            setSportsSelected(true)
        } else {
            setSportsSelected(false)
            setSelectedSport([]);
        }
    }, [selectedOption])

    // grades
    const [grade, setGrade] = useState("Freshman");
    const onChangeGrade = (e) => {
        setGrade(e.target.value);
    }
    // licennse
    const [licennse, setLicennse] = useState("0");
    const onChangeLicennse = (e) => {
        setLicennse(e.target.value);
    }
    // car
    const [car, setCar] = useState("0");
    const onChangeCar = (e) => {
        setCar(e.target.value);
    }
    // useeffect for updating all values
    useEffect(() => {
    }, [car, licennse, grade])





    // calling api below
    const { control, register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (fData) => {
        setLoader(true)

        const resultArr = newValues.map(element => {
            if (element === 'Sports Coaching') {
                if (sportsValue.length > 0) {
                    let sportsValueArr = sportsValue.split(",")
                    sportsValueArr[0] = 'Sports Coaching: ' + sportsValueArr[0];
                    sportsValueArr = sportsValueArr.join("|");
                    return sportsValueArr.toString()
                }
            } else if (element === 'Tutoring') {
                if (tutorValue.length > 0) {
                    let tutorValueArr = tutorValue.split(",")
                    tutorValueArr[0] = 'Tutoring: ' + tutorValueArr[0];
                    tutorValueArr = tutorValueArr.join("|");
                    return tutorValueArr.toString()
                }
            } else if (element === 'Other') {
                if (otherSelected && fData.otherValues) {
                    return fData.otherValues
                }
            }
            return element;
        });

        // let pri_task = '';
        // let pri_task_sport = '';
        // let pri_task_tutor = '';
        // if(fData.primary_task.length > 0){
        //     fData.primary_task.map(singleIndex => {
        //         if(!singleIndex.parent){
        //             if(singleIndex.value != 'Other' ){
        //                 pri_task += singleIndex.value + ','
        //             }
        //         } else {
        //             if(singleIndex.parent === 'Tutoring'){
        //                 if(pri_task_tutor.length > 0){
        //                     pri_task_tutor += ' | '+singleIndex.value
        //                 } else {
        //                     pri_task_tutor += singleIndex.parent+' : '+singleIndex.value
        //                 }
        //             } else if(singleIndex.parent === 'Sports Coaching'){
        //                 if(pri_task_sport.length > 0){
        //                     pri_task_sport += ' | '+singleIndex.value
        //                 } else {
        //                     pri_task_sport += singleIndex.parent+' : '+singleIndex.value
        //                 }
        //             }
        //         }
        //     })
        //     pri_task += (pri_task_sport.length > 0) ? pri_task_sport+',': '';
        //     pri_task += (pri_task_tutor.length > 0) ? pri_task_tutor+',' : '';
        // }

        // if(otherSelected && fData.otherValues){
        //     resultArr.push(fData.otherValues)
        // }
        // if(pri_task.slice(-1) == ','){
        //     pri_task = pri_task.substring(0, pri_task.length - 1);
        // }


        const data = {
            user_id: (JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id),
            grade: grade,
            have_driving_licence: parseInt(licennse),
            have_car: parseInt(car),
            about: fData.about,
            skills: resultArr.toString(),
            minimum_hourly_rate: fData.minRate
        }

        // calling Api
        const resp = await updateStudentDetail(data)
        if (resp.status === 200) {
            Swal.fire({
                title: resp.data.message,
                timer: 1500,
                icon: 'success',
                showConfirmButton: false,
            })
            setTimeout(() => {
                navigate('/signUpRoute/step-three');
            }, 2000);
        } else {
            Swal.fire({
                title: resp.data.message,
                timer: 1500,
                icon: 'error',
                showConfirmButton: false,
            })
            setLoader(false)
        }

    }

    // fill out later
    const handleChange = (e) => {
        let isChecked = e.target.checked;
        if (isChecked) {
            setTimeout(() => {
                navigate('/signUpRoute/step-three');
            }, 200);
        }
    }

    return (
        
        <>
            <div style={{ zIndex: "9999" }} className='mb-green-arrow'>
                <Link to="/signUpRoute/step-one">
                    <img src="./assets/images/Vector_backIcon.svg" alt="" />
                </Link>
            </div>

            <div className='block-img-mb mb-head-img'>
                <img src="/assets/images/Ellipse511.png" alt="123" />
            </div>
            {/* desktopStep */}
            <div className='stOneDiv setResonive'>
                <img src="/assets/images/offer/stepTwoDesktop.svg" alt="" />
            </div>
            {/* mobileStep */}
            <div className='stOneDivResp setResonive1'>
                <img src="/assets/images/offer/stepTwoMobile.svg" alt="" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='SignupConfirmEmail stepForm mb-stepone-mrgn'>

                <div className='stepOne'>

                    <h2>About You</h2>
                    <div className='mb35 mb-skills-signup'>
                        <p className='mb-1 mb-skills-para'>What grade are you in?</p>
                        <div className='gnder pOptions d-flex setStepOneR' onChange={(e) => onChangeGrade(e)}>
                            <div className='selectGEndrDiv'>
                                <input type="radio" value="Freshman" id='Freshman' name='Grade' checked={grade === "Freshman"} />
                                <label htmlFor="Freshman" className='secondary gender-mb'>Freshman</label>
                            </div>
                            <div className='selectGEndrDiv'>
                                <input type="radio" value="Sophomore" id="Sophomore" name='Grade' checked={grade === "Sophomore"} />
                                <label htmlFor="Sophomore" className='secondary gender-mb'>Sophomore</label>
                            </div>
                            <div className='selectGEndrDiv'>
                                <input type="radio" value="Junior" id="Junior" name='Grade' checked={grade === "Junior"} />
                                <label htmlFor="Junior" className='secondary gender-mb'>Junior</label>
                            </div>
                            <div className='selectGEndrDiv'>
                                <input type="radio" value="Senior" id="Senior" name='Grade' checked={grade === "Senior"} />
                                <label htmlFor="Senior" className='secondary gender-mb'>Senior</label>
                            </div>
                        </div>
                    </div>
                    <div className='mb35 mb-skills-signup'>
                        <div className='qMain justifyNone'>
                            <div className='qParts'>
                                <p className='mb-1 mb-skills-para'>Do you have a driver’s license?</p>
                                <div className='gnder pOptions d-flex' onChange={(e) => onChangeLicennse(e)}>
                                    <div className='selectGEndrDiv'>
                                        <input type="radio" value="1" id="Yes" name='licnese' checked={licennse === "1"} />
                                        <label htmlFor="Yes" className='secondary gender-mb'>Yes</label>
                                    </div>
                                    <div className='selectGEndrDiv'>
                                        <input type="radio" value="0" id="No" name='licnese' checked={licennse === "0"} />
                                        <label htmlFor="No" className='secondary gender-mb'>No</label>
                                    </div>
                                </div>
                            </div>
                            <div className='qParts2'>
                                <p className='mb-1 mb-skills-para'>Do you have your own car?</p>
                                <div className='gnder pOptions d-flex' onChange={(e) => onChangeCar(e)}>
                                    <div className='selectGEndrDiv'>
                                        <input type="radio" value="1" id="Yese" name='car' checked={car === "1"} />
                                        <label htmlFor="Yese" className='secondary gender-mb'>Yes</label>
                                    </div>
                                    <div className='selectGEndrDiv'>
                                        <input type="radio" value="0" id="Nope" name='car' checked={car === "0"} />
                                        <label htmlFor="Nope" className='secondary gender-mb'>No</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row mb35 stepOneTaskWithPrise'>
                        <div className='col-md-8 col-7'>
                            <p className='mb-1 mb-skills-para'>Choose your primary tasks</p>
                            {/* 
                            <Controller
                                name="select"
                                control={control}
                                {...register("primary_task", { required: false , onChange: (e) => checkInPrimaryTask(e)})}
                                render={({ field }) => <Select
                                    placeholder="Search..."
                                    className='StepOneSelect'
                                    closeMenuOnSelect={false}
                                    isMulti
                                    
                                    defaultValue={selectedOption}
                                    styles={style}
                                    hideSelectedOptions={false}
                                    options={optionValue}
                                    {...field} 
                            
                                />}
                            />
                            */}

                            <Select
                                className='StepOneSelect mainTaskSelect'
                                closeMenuOnSelect={false}
                                isMulti
                                options={options}
                                styles={style}
                                onChange={setSelectedOption}
                                defaultValue={selectedOption}
                            />

                        </div>
                        <div className='col-md-4 col-5'>
                            <p className='mb-1 mb-skills-para'>Minimum hourly rate</p>
                            {/* <input placeholder='$00.00' className='nameField mbsignup-form w-75 text-center' type="number"  {...register("minRate", { required: true })} /> */}
                            <div className='DollarSign'>
                                <input placeholder='00.00' className='nameField mbsignup-form w-75 text-center' type="number" maxLength={4}  {...register("minRate", { required: true , maxLength: 4 })} />
                            </div>
                            {errors.minRate && <span className='eror'>This field is required</span>}

                        </div>

                    </div>
                    <div className='row mb35'>
                        {sportsSelected ?
                            <div className='col-6'><Select
                                placeholder="Select Sports"
                                className='StepOneSelect SubSelectTask mt-20'
                                closeMenuOnSelect={false}
                                isMulti
                                options={sportsOptions}
                                styles={style}
                                onChange={setSelectedSport}
                                defaultValue={selectedSport}
                            /></div>
                            : ""
                        }
                        {tutorSelected ?
                            <div className='col-6'><Select
                                placeholder="Select Subjects"
                                className='StepOneSelect SubSelectTask mt-20'
                                closeMenuOnSelect={false}
                                isMulti
                                options={tutorOptions}
                                styles={style}
                                onChange={setSelectedTutor}
                                defaultValue={selectedTutor}
                            /></div>
                            : ""
                        }
                        {
                            otherSelected ? <div className='col-6'>
                                <input className='createFormLInput mt-20' placeholder='Add your specific task.' {...register("otherValues")} /></div> :
                                ""
                        }
                    </div>
                    <div className='mb35 mb-skills-signup'>
                        <p className='mb-1 mb-skills-para'>About You</p>
                        <div>
                            <textarea className='formMsg' placeholder='Describe yourself and how you can help' {...register("about", { required: true })} />
                        </div>
                        {errors.about && <span className='eror'>This field is required</span>}
                    </div>
                    <div className='formCheck'>
                        <div className="pretty p-svg p-curve">
                            <input onChange={(e) => handleChange(e)} type="checkbox" />
                            <div className="state p-success">
                                <svg className="svg svg-icon" viewBox="0 0 20 20">
                                    <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" ></path>
                                </svg>
                                <label>Fill out later</label>
                            </div>
                        </div>
                    </div>
                    <div className='formBtnSet mb-formBtnSet'>
                        <Link to="/signUpRoute/step-one" className='backBtn mb-backBtn'>Back</Link>
                        {loader ?
                            <div className="relative stepLoderAlign">
                                <div className="loader alignLoader"></div>
                                <input className='backBtn ctn pl40' value="Continue" type="button" disabled />
                            </div>
                            :
                            <input className='backBtn ctn' value="Continue" type="submit" />
                        }
                    </div>
                </div>
            </form>
            <LowerCircle />
        </>
    )
}

export default StepOne