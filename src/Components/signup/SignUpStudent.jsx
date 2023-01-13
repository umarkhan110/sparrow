import React from 'react'
import { Link } from 'react-router-dom'
import SignUpNav from './SignUpNav'
import { useForm, Controller } from "react-hook-form";
import { uploadFile } from '../../services/uploadfile/FileUpload';
import { createUser } from '../../services/users/User';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { verificationAccount } from '../../services/authentication/VerificationNotification';
import { useState } from 'react';
import LowerCircle from './LowerCircle';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Input from 'react-phone-number-input/input'
// firebase
import {
    collection as fireStoreCollectione,
    getFirestore,
    addDoc,
} from "firebase/firestore";
import { db, firebaseConfig } from "../../firebase/FireBase";
import { initializeApp } from 'firebase/app';
import { useCookies } from 'react-cookie';

const SignUpStudent = () => {
    // firebase
    const appNew = initializeApp(firebaseConfig);
    const dbNew = getFirestore(appNew);
    // 
    const [loader, setLoader] = useState(false)
    const [cookies] = useCookies(['userSellData']);

    // for image
    const [picture, setPicture] = useState(null)
    const [imgData, setImgData] = useState()
    const imagesPreview = (e) => {
        if (e.target.files[0]) {
            const allowedImage = ["image/jpeg" , "image/jpg"  , "image/png" , "image/gif"];
            let checkImageTypeAndSize = allowedImage.includes(e.target.files[0]?.type);
            if((e.target.files[0]?.size <= 2097152) && checkImageTypeAndSize){
                setPicture(e.target.files[0])
                const reader = new FileReader()
                reader.readAsDataURL(e.target.files[0])
                reader.addEventListener("load", () => {
                    setImgData(reader.result)
                })
            } else{
                Swal.fire({
                    title: 'Must be an Image of type png,jpg,jpeg,gif with max size of 2MB',
                    timer: 2500,
                    icon: 'error',
                    showConfirmButton: false,
                })
            }

            
        }
    }

    // for ssn number
    const [ssn_number, setSSN_number] = useState("");
    
    function formatSSN(value) {

        if (!value) return value;
        const ssn = value.replace(/[^\d]/g, "");

        const ssnLength = ssn.length;
      
        if (ssnLength < 4) return ssn;
      
        if (ssnLength < 6) {
          return `${ssn.slice(0, 3)}-${ssn.slice(3)}`;
        }
      
        return `${ssn.slice(0, 3)}-${ssn.slice(3, 5)}-${ssn.slice(5, 9)}`;
      }

    const handleInput = (e) => {
        const formattedPhoneNumber = formatSSN(e.target.value);
        setSSN_number(formattedPhoneNumber);
    };

    //for navigation
    let navigate = useNavigate();
    // handling form
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (fData) => {
        // checking if the image is null so that code will not run
        if (picture !== null) {
            setLoader(true)
            const data = {
                first_name: fData.fname,
                last_name: fData.lname,
                email: fData.email,
                password: fData.pass,
                password_confirmation: fData.CPass,
                image: "",
                ssn : fData.socialSecNum,
                phone: fData.number,
                role: 2,
            }
            if(cookies.userSellData){
                data["is_sell_data_allowed"] = parseInt(cookies.userSellData)
            }

            const formDataImg = new FormData();
            formDataImg.append("image", picture);
            const imageResponse = await uploadFile(formDataImg);
            if (imageResponse.status === 200) {
                data.image = imageResponse.data.url;
            } else {
                Swal.fire({
                    title: imageResponse.data.message,
                    timer: 2500,
                    icon: 'error',
                    showConfirmButton: false,
                })
                setLoader(false)
            }

            const resp = await createUser(data)
            const errors = resp?.data?.errors;
            if (resp.status === 200) {
                // firebase
                await addDoc(fireStoreCollectione(dbNew, "Users"), {
                    email: fData.email,
                    id: String(resp?.data?.user?.id),
                    imageUrl: imageResponse.data.url,
                    name: fData.fname,
                });
                // 
                Swal.fire({
                    title: "User has been Created!",
                    timer: 1500,
                    icon: 'success',
                    showConfirmButton: false,
                })

                // seting item in local storage so student will show logged in screen
                localStorage.setItem("sparrowSignIn", JSON.stringify(resp.data))
                // calling api for send email to user
                const resp1 = await verificationAccount(resp?.data?.token)
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
            else {
                Swal.fire({
                    title: errors.email || errors.password || errors.image,
                    timer: 3500,
                    icon: 'error',
                    showConfirmButton: false,
                })
                setLoader(false)
            }
        } else {
            Swal.fire({
                title: "Image is required",
                timer: 1500,
                icon: 'error',
                showConfirmButton: false,
            })
        }
    }

    const regex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$";

    return (
        <>
            <div className='signUpStudent'>
                <div className='signUpStudentAlignment  mb-signup-form'>
                    <div className='mb-green-arrow'>
                        <Link to="/signUpRoute/welcome-to-sparrow">
                            <img src="./assets/images/Vector_backIcon.svg" />
                        </Link>
                    </div>
                    <div className='block-img-mb mb-head-img'>
                        <img src="/assets/images/Ellipse 51.png" alt="123" />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className='signUpStudentForm mb-studentsign'>
                        <div className='parrot-mb'>
                            <img className='parrot-forgt' src="./assets/images/4A4A4A2022-06-08T1224541.png" alt="parrot" />
                        </div>
                        <h2 className='formHeadStudent text-center'>Sign Up</h2>
                        <div className='upperForm text-center'>
                            <div>
                                {imgData ? <img style={{ padding: "7px", borderWidth: "8px" }} className='sizeSet imgBorder' src={imgData} alt='' /> :
                                    <>
                                    </>
                                }
                            </div>
                            <div className='createFormUploadBtns mb-createFormUploadBtns'>
                                <div className='uploadBtn text-center'>
                                    <img src="/assets/images/Uploadphoto.svg" alt="" className='setResonive' />
                                    <img src="/assets/images/uploadMobileUploadBtn.svg" alt="" className='d-none makeMobileOnly' />
                                    <input onChange={imagesPreview} type="file" accept='image/*' />
                                </div>
                            </div>
                        </div>
                        {/* <div className='mb35 d-flex d-flex-mb'>
                            <div className='mb-one'>
                                <p className='mb-1'>First Name</p>
                                <input placeholder='Enter First Name' className='nameField mbsignup-form' type="text"  {...register("fname", { required: true })} />
                                {errors.fname && <span className='eror'>This field is required</span>}
                            </div>
                            <div className='mb-two'>
                                <p className='mb-1 last-signupname'>Last Name</p>
                                <input placeholder='Enter Last Name' className='nameField ml-1' type="text"  {...register("lname", { required: true })} />
                                {errors.lname && <span className='eror'>This field is required</span>}
                            </div>
                        </div> */}

                        <div className='mb35 d-flex mb-dflex'>
                            <div className='first-mb mb-first'>
                                <p className='mb-1'>First Name</p>
                                <input style={{ color: "#C4C4C4" }} placeholder='Enter First Name' className='nameField' type="text" {...register("fname", { required: true })} />
                                {errors.fname && <span className='eror'>This field is required</span>}
                            </div>
                            <div className='last-mb mb-last'>
                                <p className='mb-1 last-signupname'>Last Name</p>
                                <input style={{ color: "#C4C4C4" }} placeholder='Last Name' className='nameField ml-1' type="text" {...register("lname", { required: true })} />
                                {errors.lname && <span className='eror'>This field is required</span>}
                            </div>
                        </div>

                        <div className='mb35'>
                            <p className='mb-1'>School Email Address</p>
                            <div>
                                <input
                                    style={{ color: "#C4C4C4" }} placeholder='Enter Email Address' className='createFormLInput mbsignup-form' type="email" {...register("email", { required: true })} />
                                {errors.email === "pattern" && (
                                    <span className="eror">This field is reqiured</span>
                                )}
                                {/* <input
                                    style={{ color: "#C4C4C4" }} placeholder='Email Address' className='createFormLInput mbsignup-form' type="email" {...register("email", { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$/i })} />
                                {errors?.email?.type === "pattern" && (
                                    <span className="eror">Please enter student email address ending with edu</span>
                                )} */}
                            </div>
                        </div>
                        <div className='mb35'>
                            <p className='mb-1'>Social Security Number</p>
                            <div className='ssnField_mobile'>
                                <input placeholder='000-00-0000' className='createFormLInput input-mb-create' type="text" value={ssn_number} {...register("socialSecNum", { required: true, onChange:(e) => handleInput(e) })}/>
                            </div>
                            {errors.socialSecNum && <span className='eror'>This field is required</span>}

                        </div>
                        <div className='mb35'>
                            <p className='mb-1'>Phone Number</p>
                            <div>
                                {/* <PhoneInput name="phoneInput" countryCallingCodeEditable={false} defaultCountry="US" country="US" countries={["US"]} international className="createFormLInput setPhoneField" placeholder="Phone Number" limitMaxLength="10" {...register("number", { required: true })} /> */}
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
                                        {...register("number", { required: true })}
                                    />

                                </div>
                                {errors.number && (
                                    <span className="eror">This field is required</span>
                                )}
                            </div>
                        </div>
                        <div className='mb35'>
                            <p className='mb-1'>Create a Password</p>
                            <div>
                                <input placeholder='Create a Password' className='createFormLInput mbsignup-form' type="password"  {...register("pass", { required: true })} />
                                {errors.pass && <span className='eror'>This field is required</span>}
                            </div>
                        </div>
                        <div className='mb35'>
                            <p className='mb-1'>Confirm Password</p>
                            <div>
                                <input placeholder='Confirm Password' className='createFormLInput mbsignup-form' type="password"  {...register("CPass", { required: true })} />
                                {errors.CPass && <span className='eror'>This field is required</span>}
                            </div>
                        </div>
                        <div className='mb35'>
                            <div className='d-flex check__Iacknowledge'>
                                <input
                                    type='checkbox'
                                    {...register("agree_Check", { required: true } )}
                                    className='mx-3 agreeCheckBox'
                                />
                                <div>
                                    <p>I acknowledge that I agree to the <Link to='/terms'>Terms of Use</Link> and have read the <Link to='/privacy-policy'>Privacy Policy</Link>. </p>
                                    {errors.CPass && <span className='eror'>This field is required</span>}
                                </div>
                            </div>
                           
                        </div>
                          
                        <div className='gnder display-mb'>
                            {loader ?
                                <div className="relative">
                                    <div className="loader alignLoader"></div>
                                    <input className='primary fnt18 mb-fnt18 pl40' type='button' value='Sign Up' />
                                </div>
                                :
                                <input className='primary fnt18 mb-fnt18' type="submit" value="Sign Up" />
                            }
                        </div>
                        <div className='mb-4626'>
                            <h5>Already have an account?</h5>
                        </div>
                        <div className='mb-4626 mb-4342'>
                            <Link to="/signin" className='studentLogIn'>Log In</Link>
                        </div>
                    </form>
                </div>
            </div>
            <LowerCircle />
        </>
    )
}

export default SignUpStudent