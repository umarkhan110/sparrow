import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LowerCircle from '../signup/LowerCircle'
import { useForm } from "react-hook-form";
import { createUser } from '../../services/users/User';
import { uploadFile } from '../../services/uploadfile/FileUpload';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import Input from 'react-phone-number-input/input'
import { verificationAccount } from '../../services/authentication/VerificationNotification';
import 'react-phone-number-input/style.css'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase/FireBase';
import {
    collection as fireStoreCollectione,
    getFirestore,
    addDoc,
} from "firebase/firestore";
import { useCookies } from 'react-cookie';

const CustomerSignUp = () => {
    // firebase
    const appNew = initializeApp(firebaseConfig);
    const dbNew = getFirestore(appNew);
    // 
    // adding loader on submiting form
    const [loader, setLoader] = useState(false)
    const [cookies] = useCookies(['userSellData']);
    //for navigation
    let navigate = useNavigate();
    // for image
    const [picture, setPicture] = useState(null)
    const [imgData, setImgData] = useState()
    const imagesPreview = (e) => {
        if (e.target.files[0]) {
            setPicture(e.target.files[0])
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.addEventListener("load", () => {
                setImgData(reader.result)
            })
        }
    }


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

    // handling form
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (fData) => {
        if (picture !== null) {
            setLoader(true)
            const data = {
                first_name: fData.fname,
                last_name: fData.lname,
                email: fData.email,
                password: fData.pass,
                password_confirmation: fData.CPass,
                ssn: fData.socialSecNum,
                image: "",
                phone: fData.number,
                role: 1,
            }
            if (cookies.userSellData) {
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

            // calling api
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
                Swal.fire({
                    title: "User has been Created!",
                    timer: 1500,
                    icon: 'success',
                    showConfirmButton: false,
                })
                // seting item in local storage so client will show logged in screen
                localStorage.setItem("sparrowSignIn", JSON.stringify(resp.data))
                // hitting verificationAccount api for sending email to user
                const resp1 = await verificationAccount(resp?.data?.token)
                setTimeout(() => {
                    Swal.fire({
                        title: "Email has been sent! Please verify your account",
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
                    title: errors.email || errors.password || errors.image || "Error",
                    timer: 3500,
                    icon: 'error',
                    showConfirmButton: false,
                })
                setLoader(false)
            }
        }
        else {
            Swal.fire({
                title: "Image is required",
                timer: 1500,
                icon: 'error',
                showConfirmButton: false,
            })
        }
    }

    return (
        <>
            <div className='createAccount customerSignup mb-all-1 pad-mb-top'>
                <div className='btn-mb-arrow'>
                    <Link to="/signUpRoute/welcome-to-sparrow">
                        <img src="./assets/images/whiteBackIcon.svg" alt="" />
                    </Link>
                </div>
                <h2>Sign Up</h2>
                <div className='createAccountForm mb-createsignup'>
                    <form onSubmit={handleSubmit(onSubmit)} className='mb-css-1 mb-css-5'>
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
                        <div className='inner mt-5'>
                            <div className='mb35 d-flex mb-dflex'>
                                <div className='first-mb mb-first'>
                                    <p className='mb-1'>First Name</p>
                                    <input style={{ color: "#C4C4C4" }} placeholder='First Name' className='nameField' type="text" {...register("fname", { required: true })} />
                                    {errors.fname && <span className='eror'>This field is required</span>}
                                </div>
                                <div className='last-mb mb-last'>
                                    <p className='mb-1 last-signupname'>Last Name</p>
                                    <input style={{ color: "#C4C4C4" }} placeholder='Last Name' className='nameField ml-1' type="text" {...register("lname", { required: true })} />
                                    {errors.lname && <span className='eror'>This field is required</span>}
                                </div>
                            </div>
                            <div className='mb35'>
                                <p className='mb-1'>Email Address</p>
                                <div>
                                    <input style={{ color: "#C4C4C4" }} placeholder='Email Address' className='createFormLInput' type="email" {...register("email", { required: true })} />
                                    {errors.email && <span className='eror'>This field is required</span>}
                                </div>
                            </div>
                            <div className='mb35'>
                                <p className='mb-1'>Social Security Number</p>
                                <div className='ssnField_mobile'>
                                    <input placeholder='000-00-0000' className='createFormLInput input-mb-create' type="text" value={ssn_number} {...register("socialSecNum", { required: true, onChange: (e) => handleInput(e) })} />
                                </div>
                                {errors.socialSecNum && <span className='eror'>This field is required</span>}

                            </div>
                            <div className='mb35'>
                                <p className='mb-1'>Phone Number</p>
                                <div>
                                    {/* <PhoneInput name="phoneInput" countryCallingCodeEditable={false} countries={["US"]} defaultCountry="US" country="US" international className="createFormLInput setPhoneField" placeholder="Phone Number" limitMaxLength="10" {...register("number", { required: true })} /> */}

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
                                    <input style={{ color: "#C4C4C4" }} placeholder='Create a Password' className='createFormLInput' type="password" {...register("pass", { required: true })} />
                                    {errors.pass && <span className='eror'>This field is required</span>}
                                </div>
                            </div>
                            <div className='mb35 mb-432'>
                                <p className='mb-1'>Confirm Password</p>
                                <div>
                                    <input style={{ color: "#C4C4C4" }} placeholder='Confirm Password' className='createFormLInput' type="password" {...register("CPass", { required: true })} />
                                    {errors.CPass && <span className='eror'>This field is required</span>}
                                </div>
                            </div>
                            <div className='mb35'>
                                <div className='d-flex check__Iacknowledge'>
                                    <input
                                        type='checkbox'
                                        {...register("agree_Check", { required: true })}
                                        className='mx-3 agreeCheckBox'
                                    />
                                    <div>
                                        <p>I acknowledge that I agree to the <Link to='/terms'>Terms of Use</Link> and have read the <Link to='/privacy-policy'>Privacy Policy</Link>. </p>
                                        {errors.CPass && <span className='eror'>This field is required</span>}
                                    </div>
                                </div>

                            </div>
                            <div className='gnder mb-4'>
                                {loader ?
                                    <div className="relative">
                                        <div className="loader alignLoader"></div>
                                        <input style={{ boxShadow: "none" }} className='primary pl40' type='button' disabled value='Continue' />
                                    </div>
                                    :
                                    <input style={{ boxShadow: "none" }} className='primary' type='submit' value='Continue' />
                                }
                            </div>
                            <div className='h5-mb'>
                                <h5 style={{ fontFamily: "Manrope", color: "#4E4B66" }}>Already have an account?</h5>
                            </div>
                            <div className='log-mb'>
                                <Link to="/signin" className='studentLogIn'>Log In</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <LowerCircle />
        </>
    )
}

export default CustomerSignUp