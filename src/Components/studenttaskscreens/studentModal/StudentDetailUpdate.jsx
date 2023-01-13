import { useState , useEffect } from 'react' 
import { Col, Container, Row } from 'react-bootstrap'
import { Link , useNavigate } from 'react-router-dom'
import { updateStudentDetail } from '../../../services/studentdetails/UpdateStudentDetail';
import Swal from 'sweetalert2';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm , Controller } from "react-hook-form";


const StudentDetailUpdate = (props) => {

        // handling form
        const { control ,register, handleSubmit, formState: { errors } } = useForm();

        // react select
        const style = {
            control: base => ({
                ...base,
                border: "1px solid #EAEFF3 !important",
                // This line disable the blue border
                boxShadow: "none",
                borderRadius: "15px",
                padding: "15px 24px",
                background: "#F8F8F8"
            })
        };

        const options = [
            { value: 'Child Care', label: 'Child Care' },
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

        let lastValue = props?.stdDetail?.student_details?.skills?.split(",");
        let sportsTask = '';
        let tutorTask = '';
        let sportsArr = [];
        let tutorArr = [];
        let otherValue= '';


        const resultArr = lastValue?.map(element => {
            if (element.startsWith("Sports Coaching")) {
                sportsTask= element.replace('Sports Coaching: ','')
                return {'label':"Sports Coaching" ,'value':"Sports Coaching"} 
            } else if(element.startsWith("Tutoring")) {
                tutorTask= element.replace('Tutoring: ','')
                return {'label':"Tutoring" ,'value':"Tutoring"} 
            } else {
                if(options.find(o => o.value === element) === undefined){
                    if (otherValue.length > 0){
                        otherValue += ','
                    }
                    otherValue += element
                    return {'label':'Other' ,'value':'Other'}
                } else{
                    return {'label':element ,'value':element}
                }

            }
        });
        // console.log(sportsTask)
        if(sportsTask.length >= 1){
            sportsArr = sportsTask.split("|").map(element => {
                return {'label':element ,'value':element}
            })
        }
        // console.log(sportsArr)
        if(tutorTask.length > 1){
            tutorArr = tutorTask.split("|").map(element => {
                return {'label':element ,'value':element}
            })
        }
        

        const [selectedOption, setSelectedOption] = useState(resultArr);
    
        // ..................
        // sports options for select


        const [selectedSport, setSelectedSport] = useState(sportsArr);
        let newSelectedSport = selectedSport?.map((item => {
            return item.value
        }))
        let sportsValue = newSelectedSport.toString()
    
        const sportsOptions = [
            { value: 'Baseball', label: 'Baseball' },
            { value: 'Basketball', label: 'Basketball' },
            { value: 'Wrestling', label: 'Wrestling' },
            { value: 'Soccer', label: 'Soccer' },
            // { value: 'Ice Hockey', label: 'Ice Hockey' },
            { value: 'Tennis', label: 'Tennis' },
            { value: 'Swimming', label: 'Swimming' },
            { value: 'Golf', label: 'Golf' },
            { value: 'Boxing', label: 'Boxing' },
            { value: 'American Football', label: 'American Football' },
        ]
    
        const [sportsSelected, setSportsSelected] = useState(false)
    
        // ..................
        // tutoring options for select
    
        const [selectedTutor, setSelectedTutor] = useState(tutorArr);
        let newSelectedTutor = selectedTutor?.map((item => {
            return item.value
        }))
        let tutorValue = newSelectedTutor.toString()
    
        const tutorOptions = [
            { value: 'Math', label: 'Math' },
            { value: 'German', label: 'German' },
            { value: 'English', label: 'English' },
            { value: 'Chinese', label: 'Chinese' },
            { value: 'Science', label: 'Science' },
            { value: 'History', label: 'History' },
            { value: 'Business', label: 'Business' },
            { value: 'Spanish', label: 'Spanish' },
            { value: 'Chemistry', label: 'Chemistry' },
            { value: 'Geography', label: 'Geography' },
            { value: 'Social Studies', label: 'Social Studies' },
            { value: 'Religious Education', label: 'Religious Education' },
        ]
    
        const [tutorSelected, setTutorSelected] = useState(false)
    
        // other option selected from dropdown
        const [otherSelected, setOtherSelected] = useState(false)
    
    
        //react select: converting array of object to 1 array of strings 
        //2nd step react select : converting value in format ----Yard Work,Sports Coaching,Tutoring--- to send in form
        let newValues = selectedOption?.map((item => {
            return item.value
        }))
    
        // change value
        // const optionValue = [
        //     {
        //         "label": "Yard Work",
        //         "value": "Yard Work",
        //     },{
        //         "label": "Moving",
        //         "value": "Moving",
        //     },{
        //         "label": "Grocery Delivery",
        //         "value": "Grocery Delivery",
        //     },{
        //         "label": "Housekeeping",
        //         "value": "Housekeeping",
        //     },{
        //         "label": "Pet Sitting",
        //         "value": "Pet Sitting",
        //     },{
        //         "label": "Elder Care",
        //         "value": "Elder Care",
        //     },{
        //         "label": "Window Cleaning",
        //         "value": "Window Cleaning",
        //     },{
        //         "label": "Tutoring",
        //         "value": "Tutoring",
        //         "options": [
        //             { value: 'English', label: 'English', parent:'Tutoring' },
        //             { value: 'Math', label: 'Math', parent:'Tutoring' },
        //             { value: 'Chemistry', label: 'Chemistry', parent:'Tutoring' },
        //             { value: 'History', label: 'History', parent:'Tutoring' },
        //             { value: 'Religious Education', label: 'Religious Education', parent:'Tutoring' },
        //             { value: 'Geography', label: 'Geography', parent:'Tutoring' },
        //         ]
                
        //     },{
        //         "label": "Sports Coaching",
        //         "value": "Sports Coaching",
        //         "options": [
        //             { value: 'Baseball', label: 'Baseball', parent:'Sports Coaching' },
        //             { value: 'Soccer', label: 'Soccer', parent:'Sports Coaching' },
        //             { value: 'Ice Hockey', label: 'Ice Hockey', parent:'Sports Coaching' },
        //             { value: 'Tennis', label: 'Tennis', parent:'Sports Coaching' },
        //             { value: 'Golf', label: 'Golf', parent:'Sports Coaching' },
        //             { value: 'Boxing', label: 'Boxing', parent:'Sports Coaching' },
        //             { value: 'American Football', label: 'American Football', parent:'Sports Coaching' },
        //         ]
        //     },{
        //         "label": "Other",
        //         "value": "Other",
        //     }
        // ]
        // const [otherSelected, setOtherSelected] = useState(false)
        // let otherToBeShow = false;
        // const checkInPrimaryTask = (event) => {
        //     event.target.value.map((el) => {
        //     if(el.value === 'Other'){ 
        //         otherToBeShow = true
        //         setOtherSelected(true)
        //     }
        //     })
        //     if(!otherToBeShow){
        //         setOtherSelected(false)
        //     }
        // }
        useEffect(() => {
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
        // licennse
        const LicenseValue = (props?.stdDetail?.student_details?.have_driving_licence) ? props?.stdDetail?.student_details?.have_driving_licence : "0";
        const [licennse, setLicennse] = useState(LicenseValue);
        const onChangeLicennse = (e) => {
            setLicennse(e.target.value);
        }
        //  car
        const carValue = (props?.stdDetail?.student_details?.have_car) ? props.stdDetail?.student_details?.have_car : "0";
        const [car, setCar] = useState(carValue);
        const onChangeCar = (e) => {
            setCar(e.target.value);
        }
        // useeffect for updating all values
        useEffect(() => {
        }, [car, licennse , carValue , LicenseValue])        

        const onSubmit_detail = async (fData) => {


            const resultArr = newValues?.map(element => {
                if (element === 'Sports Coaching') {
                    if(sportsValue.length > 0){
                        let sportsValueArr = sportsValue.split(",")
                        sportsValueArr[0] = 'Sports Coaching: '+sportsValueArr[0];
                        sportsValueArr = sportsValueArr.join("|");
                        return sportsValueArr.toString()
                    } 
                } else if(element === 'Tutoring') {
                    if(tutorValue.length > 0){
                        let tutorValueArr = tutorValue.split(",")
                        tutorValueArr[0] = 'Tutoring: '+tutorValueArr[0];
                        tutorValueArr = tutorValueArr.join("|");
                        return tutorValueArr.toString()
                    } 
                } else if(element === 'Other') {
                    if(otherSelected && fData.otherValues){
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
            //     pri_task += (fData.otherValues.length > 0) ? fData.otherValues : '';
            // }
            // if(pri_task.slice(-1) == ','){
            //     pri_task = pri_task.substring(0, pri_task.length - 1);
            // }  
// for hobbies          
            let hobbies_var = '';
            if(fData.hobb_1.length > 0 || fData.hobb_2.length > 0 || fData.hobb_3.length > 0){
                hobbies_var += (fData.hobb_1.length > 0) ? fData.hobb_1+',' : '';
                hobbies_var += (fData.hobb_2.length > 0) ? fData.hobb_2+',' : '';
                hobbies_var += (fData.hobb_3.length > 0) ? fData.hobb_3 : '';
                let hobbies_var_lastChr = hobbies_var.trim().charAt(hobbies_var.length - 1);
                hobbies_var =  (hobbies_var_lastChr == ',' ? hobbies_var.trim().slice(0, -1) : hobbies_var);
            }
//languages
            let lang_var = '';
            if(fData.lang_1.length > 0 || fData.lang_2.length > 0 || fData.lang_3.length > 0){
                lang_var += (fData.lang_1.length > 0) ? fData.lang_1+',' : '';
                lang_var += (fData.lang_2.length > 0) ? fData.lang_2+',' : '';
                lang_var += (fData.lang_3.length > 0) ? fData.lang_3 : '';
                let lang_var_lastChr = lang_var.trim().charAt(lang_var.length - 1);
                lang_var =  (lang_var_lastChr == ',' ? lang_var.trim().slice(0, -1) : lang_var);
            }

            const inSideStudentDetailData = {
                user_id: JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id,
                have_driving_licence: licennse,
                have_car: car,
                about: fData.about.substring(0, 424),
                skills: resultArr.toString(),
                minimum_hourly_rate:fData.minRate,
                fun_facts: fData.funfact,
                hobbies: hobbies_var,
                languages: lang_var,
            }

// console.log("resultArr studentDetailDetail: " , inSideStudentDetailData);

            const resp1 = await updateStudentDetail(inSideStudentDetailData)
            const errors = resp1?.data?.errors;

            if (resp1.status === 200) {
                Swal.fire({
                    title: "Student Detail has been updated!",
                    timer: 1500,
                    icon: 'success',
                    showConfirmButton: false,
                })
                setTimeout(() => {
                
                }, 2000);
            }
            else {
                Swal.fire({
                    title:  resp1.data.message,
                    // timer: 3500,
                    icon: 'error',
                    showConfirmButton: false,
                })
            }
            
            props.modalDone()
        
        }

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
                <Modal.Body className='studentDetailModalBody'>
                    <div className='createAccountForm mb-createsignup' style={{maxWidth:'100%' , marginBottom:'35px'}}>
                        <form onSubmit={handleSubmit(onSubmit_detail)} className='mb-css-1 mb-css-5 mx-5' id="updateStudentDetailForm">
                            
                            <div className='mb35 mb-skills-signup'>
                                <p className='mb-1 mb-skills-para  text-start'>About You</p>
                                <div>
                                    <textarea className='formMsg' placeholder='Describe yourself and how you can help' maxLength={255} {...register("about", { required: true , value: props?.stdDetail?.student_details?.about  })} />
                                </div>
                                {errors.about && <span className='eror'>This field is required</span>}
                            </div>
                            
                            <div className='mb35 mb-skills-signup'>
                                <div className='qMain justify-content-center flex-wrap row carLisenceField text-start'>
                                    <div className=' col-md-6 col-sm-12'>
                                        <p className='mb-1 mb-skills-para'>Driver’s License</p>
                                        <div className='gnder pOptions d-flex' onChange={(e) => onChangeLicennse(e)}>
                                            <div className='selectGEndrDiv'>
                                                <input type="radio" value="1" id="Yes" name='licnese' defaultChecked={licennse == "1"} />
                                                <label htmlFor="Yes" className='secondary gender-mb'>Yes</label>
                                            </div>
                                            <div className='selectGEndrDiv'>
                                                <input type="radio" value="0" id="No" name='licnese' defaultChecked={licennse == "0"} />
                                                <label htmlFor="No" className='secondary gender-mb'>No</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=' col-md-6 col-sm-12 vehicleDivModal'>
                                        <p className='mb-1 mb-skills-para'>Own Vehicle</p>
                                        <div className='gnder pOptions d-flex' onChange={(e) => onChangeCar(e)}>
                                            <div className='selectGEndrDiv'>
                                                <input type="radio" value="1" id="Yese" name='car' defaultChecked={car == "1"} />
                                                <label htmlFor="Yese" className='secondary gender-mb'>Yes</label>
                                            </div>
                                            <div className='selectGEndrDiv'>
                                                <input type="radio" value="0" id="Nope" name='car' defaultChecked={car == "0"} />
                                                <label htmlFor="Nope" className='secondary gender-mb'>No</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='row mb35'>
                                <div className='col-8' style={{textAlign:"left"}}>
                                    <p className='mb-1 mb-skills-para text-left'>Choose your primary tasks</p>
                                    <Select
                                        className='StepOneSelect stepOneTaskWithPrise'
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={options}
                                        styles={style}
                                        onChange={setSelectedOption}
                                        // defaultValue={selectedOption}   
                                        defaultValue={selectedOption?.map(valueSingle => options.find(({ value }) => value == valueSingle.value))}
                                    />
                                    
                                </div>
                                <div className='col-4'>
                                    <p className='mb-1 mb-skills-para'>Minimum hourly rate</p>
                                    <div className='DollarSign'>
                                        <input placeholder='00.00' className='nameField mbsignup-form w-100 ml-1 text-center' type="number"  {...register("minRate", { required: true, value: props?.stdDetail?.student_details?.minimum_hourly_rate  })} />
                                    </div>
                                    
                                    {errors.minRate && <span className='eror'>This field is required</span>}

                                </div>

                            </div>
                            <div className='row mb35' style={{textAlign:"left"}}>
                               
                                {sportsSelected ?
                                    <div className='col-6'><Select
                                        placeholder="Select Sports"
                                        className='StepOneSelect mt-20 subSkillTask'
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={sportsOptions}
                                        styles={style}
                                        onChange={setSelectedSport}
                                        // defaultValue={selectedSport}
                                        defaultValue={selectedSport?.map(valueSingle => sportsOptions.find(({ value }) => value == valueSingle.value))}
                                    /></div>
                                    : ""
                                }
                                {tutorSelected ?
                                    <div className='col-6'><Select
                                        placeholder="Select Subjects"
                                        className='StepOneSelect mt-20 subSkillTask'
                                        closeMenuOnSelect={false}
                                        isMulti
                                        options={tutorOptions}
                                        styles={style}
                                        onChange={setSelectedTutor}
                                        // defaultValue={selectedTutor}
                                        defaultValue={selectedTutor?.map(valueSingle => tutorOptions.find(({ value }) => value == valueSingle.value))}
                                    /></div>
                                    : ""
                                }
                                {
                                    otherSelected ?<div className='col-6'>
                                        <p className='p-0'><small>Add more tasks with comma separator.</small></p>
                                        <input className='createFormLInput mt-2 ' placeholder='Add your specific task.' {...register("otherValues",{value: otherValue})} /></div> :
                                        ""
                                }
                            </div>
                            
                            <div className='mb35 mb-skills-signup'>
                                <p className='mb-1 mb-skills-para  text-start'>Interesting Fact</p>
                                <div>
                                    <textarea className='formMsg' placeholder='Describe a fun or interesting facts about yourself' maxLength={125}  {...register("funfact", { required: true , value: props?.stdDetail?.student_details?.fun_facts })} />
                                </div>
                                {errors.funfact && <span className='eror'>This field is required</span>}
                            </div>
                            <div className='mb35'>
                                <p className='mb-1 text-start'>Languages</p>
                                <div className='d-flex flex-wrap row justify-content-between languageModal'>
                                    <div className='col-md-4'>
                                        <input placeholder='E.g. English' className='bDateInput bdate-mb w-100 mr-5' type="text" maxLength={10} {...register("lang_1",{maxLength: 10 , value : props?.stdDetail?.student_details?.languages?.split(/\s*,\s*/)?.[0]})} />
                                    </div>
                                    <div className='col-md-4'>
                                        <input placeholder='E.g. Spanish' className='bDateInput bdate-mb w-100 mr-5' type="text" maxLength={10} {...register("lang_2",{maxLength: 10 , value : props?.stdDetail?.student_details?.languages?.split(/\s*,\s*/)?.[1]})} />
                                    </div>
                                    <div className='col-md-4'>
                                        <input placeholder='E.g. German' className='bDateInput bdate-mb w-100' type="text" maxLength={10} {...register("lang_3",{maxLength: 10 , value : props?.stdDetail?.student_details?.languages?.split(/\s*,\s*/)?.[2]})} />
                                    </div>
                                </div>
                            </div>
                            <div className='mb35'>
                                <p className='mb-1 text-start'>Hobbies</p>
                                <div className='d-flex flex-wrap row justify-content-between hobbiesModal'>
                                    <div className='col-md-4'>
                                        <input placeholder='E.g. Piano' className='bDateInput bdate-mb w-100 mr-5' type="text" maxLength={10} {...register("hobb_1",{maxLength: 10 , value : props?.stdDetail?.student_details?.hobbies?.split(/\s*,\s*/)?.[0]})} />
                                    </div>
                                    <div className='col-md-4'>
                                        <input placeholder='E.g. Climbing' className='bDateInput bdate-mb w-100 mr-5' type="text" maxLength={10} {...register("hobb_2",{maxLength: 10 , value : props?.stdDetail?.student_details?.hobbies?.split(/\s*,\s*/)?.[1]})} />
                                    </div>
                                    <div className='col-md-4'>
                                        <input placeholder='E.g. Tennis' className='bDateInput bdate-mb w-100' type="text" maxLength={10} {...register("hobb_3",{maxLength: 10 , value : props?.stdDetail?.student_details?.hobbies?.split(/\s*,\s*/)?.[2]})} />
                                    </div>
                                </div>
                            </div>
                        </form>    
                    </div>    


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClose}> Close </Button>
                    {/* <input form='my-form' type="submit" value="Continue" className='primary gender-mb-1' /> */}
                    <Button form='updateStudentDetailForm' className='btn btn-success gender-mb-1  gender-mb-1' type="submit" >Update</Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default StudentDetailUpdate