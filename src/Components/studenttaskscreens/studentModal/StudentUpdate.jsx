import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { uploadFile } from '../../../services/uploadfile/FileUpload';
import { useForm, Controller } from "react-hook-form";
import { getLocations } from '../../../services/locations/Locations';
import { updateUser } from '../../../services/users/UpdateUser';
import { updateStudentDetail } from '../../../services/studentdetails/UpdateStudentDetail';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select, { ValueType } from "react-select";
import AsyncSelect from 'react-select/async';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase/FireBase';
import {
    collection as fireStoreCollectione,
    query as fireStoreQuery,
    where as fireStoreWhere,
    doc,
    getFirestore,
    setDoc,
    getDocs,
} from "firebase/firestore"
import AuthContext from '../../../context/AuthContext';

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

const StudentUpdate = (props) => {
    // firebase
    const appNew = initializeApp(firebaseConfig);
    const dbNew = getFirestore(appNew);
    // 
    let navigate = useNavigate();
    const [btnLoder, setBtnLoder] = useState(false)

    const auth = useContext(AuthContext);
    // handling form
    // const { register, handleSubmit, formState: { errors } } = useForm();
    const { control, setValue, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            select: {}
        }
    });

    const [loader, setLoader] = useState(false);
    let classForSubmit = ''
    if (loader) {
        classForSubmit = 'btn-success gender-mb-1 gender-mb-1 .loader';
    } else {
        classForSubmit = 'btn-success gender-mb-1 gender-mb-1 ';

    }


    // get locations state for option

    // const [locations, setlocations] = useState([])
    // const locationsFunc = async () => {
    //     const resp = await getLocations();
    //     setlocations(resp.data)
        
    // }
    
    // const optionlocation = [];

    // if (locations?.length > 0) {
    //     locations?.slice(0, 500)?.map((singleLocation => {
    //         return optionlocation.push({
    //             'label': singleLocation.city + ',' + singleLocation.state,
    //             'value': singleLocation.id
    //         })
    //     }))
    // }

    // useEffect(() => {
    //     locationsFunc()
    // }, [])
 
    

    // for image
    const [picture, setPicture] = useState(null)

    const [imgData, setImgData] = useState()

    const imagesPreview = (e) => {
        if (e.target.files[0]) {
            const allowedImage = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
            let checkImageTypeAndSize = allowedImage.includes(e.target.files[0]?.type);
            if ((e.target.files[0]?.size <= 2097152) && checkImageTypeAndSize) {
                setPicture(e.target.files[0])
                const reader = new FileReader()
                reader.readAsDataURL(e.target.files[0])
                reader.addEventListener("load", () => {
                    setImgData(reader.result)
                })
            } else {
                Swal.fire({
                    title: 'Must be an Image of type png,jpg,jpeg,gif with max size of 2MB',
                    timer: 2500,
                    icon: 'error',
                    showConfirmButton: false,
                })
            }

        }
    }
    const checkLastGrade = (props?.stdDetail?.student_details?.grade) ? props.stdDetail.student_details.grade : "Freshman";
    const [grade, setGrade] = useState(checkLastGrade);
    const onChangeGrade = (e) => {
        setGrade(e.target.value);
    }

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


    const stdDate = new Date(props?.stdDetail?.student_details?.dob);
    //valid date for date of birth
    const monthForDOB = stdDate.getMonth() + 1;
    const [monthValue, setMonthValue] = useState(monthForDOB)
    const limitizeMonth = (event, pattern) => {
        if (event.target.value.length == 0) {
            setMonthValue('');
        } else {
            let valueTest = pattern.exec(event.target.value);
            if (valueTest.index == 0) {
                setMonthValue(event.target.value);
            }
        }
    }
    // date field limition
    const dateForDOB = stdDate.getDate();
    const [dateValue, setDateValue] = useState(parseInt(dateForDOB))
    const limitizeDate = (event, pattern) => {
        if (event.target.value.length == 0) {
            setDateValue('');
        } else {
            let valueTest = pattern.exec(event.target.value);
            if (valueTest.index == 0) {
                setDateValue(event.target.value);
            }
        }
    }
    // year field limition
    const [yearValue, setYearValue] = useState(stdDate.getFullYear())
    const limitizeYear = (event, pattern) => {
        if (event.target.value.length == 0) {
            setYearValue('');
        } else {
            let valueTest1 = pattern.test(event.target.value);
            if (valueTest1 || event.target.value.length < 4) {
                setYearValue(event.target.value);
            }
        }
    }

    const filterLocationOption = (inputValue) => {
        if(inputValue.length > 1){
            return auth.locations?.filter((i) =>
                i.label.toLowerCase().includes(inputValue.toLowerCase())
            );
        } else {
            let result = auth.locations.filter((i) =>
                i.label.toLowerCase().includes(inputValue.toLowerCase())
            );
            return result.splice(0,80)
        }     
    };
      
    const loadOptions = ( inputValue, callback) => {
        setTimeout(() => {
            callback(filterLocationOption(inputValue));
        }, 1000);
    };

    const student_string = JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id.toString()
 
    const onSubmit = async (fData) => {
        setBtnLoder(true)
        // debugger
        const data = {
            first_name: fData.fname,
            last_name: fData.lname,
            location: parseInt(fData.selectLocation.value),
        }


        let imageName = props?.stdDetail?.image.split("/")

        let imageForFirebase;

        if (picture !== null) {
            const formDataImg = new FormData();
            formDataImg.append("image", picture);
            formDataImg.append("old_image", imageName[imageName.length - 1]);
            

            const imageResponse = await uploadFile(formDataImg);
            data.image = imageResponse.data.url;
            imageForFirebase = data.image;
        }

        const inSideStudentDetailData = {
            user_id: JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id,
            dob: `${fData.year}-${fData.month}-${fData.day}`,
            college: fData.collegeName,
            grade: grade,
        }

        const resp = await updateUser(data)
        const resp1 = await updateStudentDetail(inSideStudentDetailData)
        const errors = resp?.data?.errors;

        if (resp.status === 200 && resp1.status === 200) {
            // updating user in firebase db Fucntion
            try {
                const q = fireStoreQuery(fireStoreCollectione(dbNew, "Users"), fireStoreWhere("id", "==", student_string));
                const docsSnap = await getDocs(q);
                // getting roomId
                const roomsId = docsSnap.docs.map(doc => {
                    return (doc.id);
                })
                // convert to string 
                const roomdId = roomsId.toString()
                // set roomId of users
                const docRef = doc(dbNew, "Users", roomdId);

                const data = {
                    email: props?.stdDetail?.email,
                    id: student_string,
                    imageUrl: imageForFirebase ?? "localhost",
                    name: fData.fname
                };
                // setting data in firebase
                setDoc(docRef, data)
                    .then(docRef => {
                        // console.log("Entire Document has been updated successfully");
                    })
                    .catch(error => {
                        // console.log(error);
                    })
            } catch (error) {
                // console.log(error);
            }
            // 
            Swal.fire({
                title: "User has been updated!",
                timer: 1500,
                icon: 'success',
                showConfirmButton: false,
            })
            setTimeout(() => {
                setBtnLoder(false)
                navigate('');
            }, 2000);
        }
        else {
            Swal.fire({
                title: resp1.data.message,
                timer: 3500,
                icon: 'error',
                showConfirmButton: false,
            })
            setLoader(false);

        }

        props.modalDone()

    }

    return (
        <div>
            <Modal
                size="lg"
                show={props.modalValue}
                onHide={props.onClose}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title className='ml-5' id="example-modal-sizes-title-lg">
                        Edit <span className='green'>Details</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='studentDetailModalBody'>
                    <div className='createAccountForm mb-createsignup' style={{ maxWidth: '100%', marginBottom: '35px' }}>
                        <form onSubmit={handleSubmit(onSubmit)} className='mb-css-1 mb-css-5' id="updateStudentForm">
                            <div className='upperForm'>
                                <div>
                                    {imgData ? <img className='sizeSet imgBorder' src={imgData} alt='' /> :
                                        <>
                                        </>
                                    }
                                </div>
                                <div className='createFormUploadBtns mb-createFormUploadBtns'>
                                    <div className='uploadBtn'>
                                        <img src="/assets/images/Uploadphoto.svg" alt="" />
                                        <input onChange={imagesPreview} type="file" accept='image/*' {...register("image", { onChange: (e) => imagesPreview(e) })} />
                                    </div>
                                    {errors.image && <span className='eror'>This field is required, allowed:png,jpg,jpeg,gif | max:2305kb </span>}
                                </div>
                            </div>

                            <div className='mb35 d-flex mb-dflex justify-content-center f_l_parent_modal text-start row'>
                                <div className='first-mb mb-first f_l_name_modal firstName_modal col-6'>
                                    <div className='d-flex flex-column'>
                                        <div>
                                            <p className='mb-1'>First Name</p>
                                            <div>
                                                <input style={{ color: "#C4C4C4" }} placeholder='First Name' className='nameField w-100' type="text" {...register("fname", { required: true, value: props?.stdDetail?.first_name })} />
                                            </div>
                                        </div>
                                        {errors.fname && <span className='eror'>This field is required</span>}
                                    </div>
                                </div>
                                <div className='last-mb mb-last f_l_name_modal col-6'>
                                    <div className='d-flex flex-column'>
                                        <div>
                                            <p className='mb-1'>Last Name</p>
                                            <div>
                                                <input style={{ color: "#C4C4C4" }} placeholder='Last Name' className='nameField w-100' type="text" {...register("lname", { required: true, value: props?.stdDetail?.last_name })} />
                                            </div>
                                        </div>
                                        {errors.lname && <span className='eror'>This field is required</span>}
                                    </div>
                                </div>
                            </div>
                            {/* </div> */}

                            <div className='mb35'>
                                <p className='mb-1 text-start'>Birth Date</p>
                                <div className='bDate row'>

                                    <div className='d-flex flex-column col-md-3 col-sm-5 col-4 dateSubFlex dayFlexDiv'>
                                        <input placeholder='MM' className='bDateInput bdate-mb w-100' type="number" value={monthValue} {...register("month", { required: true, min: 1, max: 12, maxLength: 2, onChange: (e) => limitizeMonth(e, /(0?[1-9]|1[012])$/) })} />
                                        {errors.month && <span className='eror'>Month must be between 1 and 12</span>}
                                    </div>
                                    <div className='d-flex flex-column col-md-3 col-sm-5 col-4 dateSubFlex dayFlexDiv'>
                                        <input placeholder='DD' className='bDateInput bdate-mb w-100' type="number" maxLength="2" value={dateValue} {...register("day", { required: true, min: 1, max: 31, maxLength: 2, onChange: (e) => limitizeDate(e, /([1-9]|[12][0-9]|30|31)$/) })} />
                                        {errors.day && <span className='eror'>Day must be between 1 and 31</span>}
                                    </div>
                                    <div className='d-flex flex-column col-md-4 col-sm-11 col-4 dateSubFlex yearFlexDiv'>
                                        <input placeholder='YYYY' className='bDateInput bdate-mb-1 w-100' type="number" maxLength="4" value={yearValue} {...register("year", { required: true, min: 1900, maxLength: 4, onChange: (e) => limitizeYear(e, /(19|20)[0-9][0-9]$/) })} />
                                        {errors.year && <span className='eror'>Year must be above 1900 and in 4 digits</span>}
                                    </div>
                                </div>
                            </div>
                            <div className='mb35 mb-skills-signup text-start'>
                                <p className='mb-1 mb-skills-para'>Your Grade</p>
                                <div className='gnder pOptions d-flex setStepOneR  justify-content-start flex-wrap w-100' onChange={(e) => onChangeGrade(e)}>
                                    <div className='selectGEndrDiv mt-1'>
                                        <input type="radio" value="Freshman" id='Freshman' name='Grade' defaultChecked={grade === "Freshman"} />
                                        <label htmlFor="Freshman" className='secondary gender-mb'>Freshman</label>
                                    </div>
                                    <div className='selectGEndrDiv  mt-1'>
                                        <input type="radio" value="Sophomore" id="Sophomore" name='Grade' defaultChecked={grade === "Sophomore"} />
                                        <label htmlFor="Sophomore" className='secondary gender-mb'>Sophomore</label>
                                    </div>
                                    <div className='selectGEndrDiv  mt-1'>
                                        <input type="radio" value="Junior" id="Junior" name='Grade' defaultChecked={grade === "Junior"} />
                                        <label htmlFor="Junior" className='secondary gender-mb'>Junior</label>
                                    </div>
                                    <div className='selectGEndrDiv  mt-1'>
                                        <input type="radio" value="Senior" id="Senior" name='Grade' defaultChecked={grade === "Senior"} />
                                        <label htmlFor="Senior" className='secondary gender-mb'>Senior</label>
                                    </div>
                                </div>
                            </div>

                            <div className='mb35'>
                                <p className='mb-1 text-start'>College Name</p>
                                <div>
                                    <input placeholder='E.g. Foothill College' className='createFormLInput input-mb-create' type="text" {...register("collegeName", { required: true, value: props?.stdDetail?.student_details?.college })} />
                                </div>
                                {errors.collegeName && <span className='eror'>This field is required</span>}
                            </div>
                            <div className='mb35'>
                                <p className='mb-1 text-start'>Location</p>
                                <div className='text-start'>
                                    
                                <Controller
                                    name="selectLocation"
                                    rules={{ required: true }}
                                    defaultValue={{label: `${props?.stdDetail?.location?.city},${props?.stdDetail?.location?.state} ${props?.stdDetail?.location?.zip}`, value:props?.stdDetail?.location?.id }}
                                    control={control}
                                    render={({ field }) =>
                                    <AsyncSelect {...field}  className="StepOneSelect stdUpdateLocation_select" cacheOptions loadOptions={loadOptions} defaultOptions={auth.locations.slice(0, 50)}/>
                                    }
                                />

                                


                                </div>
                                {errors.selectLocation && <span className='eror'>This field is required</span>}
                            </div>

                        </form>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClose}> Close </Button>
                    {btnLoder ?
                        <div className="relative setLod">
                            <div className="loader alignLoader"></div>
                            <Button form='updateStudentForm' className={classForSubmit}
                            >Update</Button>
                        </div>
                        :
                        <Button form='updateStudentForm' className={classForSubmit} type="submit">Update</Button>
                    }
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default StudentUpdate