import { useState, useEffect, useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { uploadFile } from '../../../services/uploadfile/FileUpload';
import { Controller, useForm } from "react-hook-form";
import { getLocations } from '../../../services/locations/Locations';
import { updateUser } from '../../../services/users/UpdateUser';
import { updateStudentDetail } from '../../../services/studentdetails/UpdateStudentDetail';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PhoneInput from 'react-phone-number-input'
import Input from 'react-phone-number-input/input'
// import Select from "react-select";
import {
    collection as fireStoreCollectione,
    query as fireStoreQuery,
    where as fireStoreWhere,
    doc,
    getFirestore,
    setDoc,
    getDocs,
} from "firebase/firestore"
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase/FireBase';

import AsyncSelect from 'react-select/async';
import AuthContext from '../../../context/AuthContext';


const CustomerUpdate = (props) => {

    // console.log(props.clientDetail)

    // firebase
    const appNew = initializeApp(firebaseConfig);
    const dbNew = getFirestore(appNew);
    // 
    let navigate = useNavigate();
    const [btnLoder, setBtnLoder] = useState(false)

    const auth = useContext(AuthContext);

    // handling form
    const { control, setValue, register, handleSubmit, formState: { errors } } = useForm();



    const [loader, setLoader] = useState(false);
    let classForSubmit = ''
    if (loader) {
        classForSubmit = 'btn-success gender-mb-1 gender-mb-1 .loader';
    } else {
        classForSubmit = 'btn-success gender-mb-1 gender-mb-1 ';
    }



    // get locations
    // const [locations, setlocations] = useState([])
    // const locationsFunc = async () => {
    //     const resp = await getLocations();
    //     setlocations(resp.data)
    // }
    // useEffect(() => {
    //     locationsFunc()
    // }, [])

    // const optionlocation = [];
    // if (locations?.length > 0) {
    //     locations?.map((singleLocation => {
    //         return optionlocation.push({
    //             'label': singleLocation.city + ',' + singleLocation.state+' '+singleLocation.zip,
    //             'value': singleLocation.id
    //         })
    //     }))
    // }
    // { props?.clientDetail?.location && setValue("location", props?.clientDetail?.location) }


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

    const [grade, setGrade] = useState("Freshman");
    const onChangeGrade = (e) => {
        setGrade(e.target.value);
    }

    const client_string = JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id.toString()
    const client_email = JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.email





    const filterLocationOption = (inputValue) => {
        if (inputValue.length > 1) {
            return auth.locations?.filter((i) =>
                i.label.toLowerCase().includes(inputValue.toLowerCase())
            );
        } else {
            let result = auth.locations?.filter((i) =>
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

    const onSubmit = async (fData) => {
        // console.log(fData)
        let imageForFirebase;
        setBtnLoder(true)
        const data = {
            first_name: fData.fname,
            last_name: fData.lname,
            phone: fData.number,
            location: parseInt(fData?.selectLocation?.value),
        }
        let imageName = props?.clientDetail?.image.split("/")
        if (picture !== null) {
            const formDataImg = new FormData();
            formDataImg.append("image", picture);
            formDataImg.append("old_image", imageName[imageName.length - 1]);
            const imageResponse = await uploadFile(formDataImg);
            data.image = imageResponse.data.url;
            imageForFirebase = data.image;
        }

        const resp = await updateUser(data)
        // const resp1 = await updateStudentDetail(inSideStudentDetailData)
        const errors = resp?.data?.errors;

        if (resp.status === 200) {
            // updating user in firebase db Fucntion
            try {
                const q = fireStoreQuery(fireStoreCollectione(dbNew, "Users"), fireStoreWhere("id", "==", client_string));
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
                    email: client_email,
                    id: client_string,
                    imageUrl: imageForFirebase ?? "localHost",
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
                title: "Client has been updated!",
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
                title: 'Client not updated.',
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
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Edit Client <span className='green'>Details</span>
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
                                        <input onChange={imagesPreview} type="file" accept='image/*' />
                                    </div>
                                </div>
                            </div>

                            <div className='mb35 d-flex mb-dflex justify-content-center f_l_parent_modal text-start row'>
                                <div className='first-mb mb-first f_l_name_modal firstName_modal col-6'>
                                    <div className='d-flex flex-column'>
                                        <div>
                                            <p className='mb-1'>First Name</p>
                                            <div>
                                                <input style={{ color: "#C4C4C4" }} placeholder='First Name' className='nameField w-100' type="text" {...register("fname", { required: true, value: props?.clientDetail?.first_name })} />
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
                                                <input style={{ color: "#C4C4C4" }} placeholder='Last Name' className='nameField w-100' type="text" {...register("lname", { required: true, value: props?.clientDetail?.last_name })} />
                                            </div>
                                        </div>
                                        {errors.lname && <span className='eror'>This field is required</span>}
                                    </div>
                                </div>
                            </div>
                            <div className='mb35'>

                                <p className='mb-1 text-start'>Email Address</p>
                                <div>
                                    <input style={{ color: "#C4C4C4" }} placeholder='Email Address' disabled className='createFormLInput notEditableCurserChange' type="email" value={props?.clientDetail?.email} />
                                    {errors.email && <span className='eror'>This field is not editable</span>}
                                </div>
                            </div>
                            <div className='mb35'>
                                {/*  style={{width:'91%' , marginLeft: '32px'}} */}
                                <p className='mb-1 text-start'>Phone Number</p>
                                <div>
                                    {/* <PhoneInput international className="createFormLInput setPhoneField w-100" placeholder="Phone Number"{...register("number", { required: true })} /> */}
                                    {/* <PhoneInput  name="phoneInput" countryCallingCodeEditable={false} defaultCountry="US" country="US" countries={["US"]} limitMaxLength="10" international className="createFormLInput setPhoneField w-100" placeholder="Phone Number"{...register("number", { required: true })} /> */}
                                    <div className="d-flex createFormLInput setPhoneField mr-0">
                                        <div className='col-2 phoneFlagPart'>
                                            <img className='flagStylePhone' src="/assets/images/createForm/US.svg" alt='Flag' width="23" />
                                        </div>
                                        <Input
                                            name="phoneInput"
                                            className="col-9 phoneInputNumOnly"
                                            country="US"
                                            international
                                            withCountryCallingCode
                                            maxLength="15"
                                            value={props?.clientDetail?.phone}
                                            {...register("number", { required: true, value: props?.clientDetail?.phone })}
                                        />

                                    </div>
                                    {errors.number && (
                                        <span className="eror">This field is required</span>
                                    )}
                                </div>
                            </div>
                            <div className='mb35'>
                                {/*  style={{width:'91%' , marginLeft: '32px'}} */}
                                <p className='mb-1 text-start'>Location</p>

                                <Controller
                                    name="selectLocation"
                                    rules={{ required: true }}
                                    defaultValue={props?.clientDetail?.location && { label: `${props?.clientDetail?.location?.city} ${props?.clientDetail?.location?.state},${props?.clientDetail?.location?.zip}`, value: props?.clientDetail?.location?.id }}
                                    control={control}
                                    render={({ field }) => <AsyncSelect {...field} className="StepOneSelect text-left makeTextleft stdUpdateLocation_select" cacheOptions loadOptions={loadOptions} defaultOptions={auth.locations?.slice(0, 50)} />}
                                />

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

export default CustomerUpdate