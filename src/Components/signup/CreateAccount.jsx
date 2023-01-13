import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LowerCircle from "./LowerCircle";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import { getLocations } from "../../services/locations/Locations";
import { createStudent } from "../../services/studentdetails/CreateStudent";
import { useNavigate } from "react-router-dom";
import { updateStudentDetail } from "../../services/studentdetails/UpdateStudentDetail";
// import Select, { ValueType } from "react-select";
import AsyncSelect from "react-select/async";
import { updateUser } from "../../services/users/UpdateUser";
import AuthContext from "../../context/AuthContext";

const CreateAccount = () => {
  let navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  // select gender function
  const [gender1, setGender1] = useState("1");
  const selectGender = (e) => {
    setGender1(e.target.value);
  };
  // following is for updating button values of gender
  useEffect(() => {}, [gender1]);

  const auth = useContext(AuthContext);

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
  // if(locations.length > 0){
  //     locations?.slice(0, 500).map((singleLocation => {
  //         return optionlocation.push({
  //             'label': singleLocation.city+','+singleLocation.zip,
  //             'value': singleLocation.id
  //         })
  //     }))
  // }

  //valid date for date of birth
  const [monthValue, setMonthValue] = useState("");
  const limitizeMonth = (event, pattern) => {
    if (event.target.value.length == 0) {
      setMonthValue("");
    } else {
      let valueTest = pattern.exec(event.target.value);
      // console.log('value: ', valueTest.index);
      if (valueTest.index == 0) {
        setMonthValue(event.target.value);
      }
    }
  };
  // date field limition
  const [dateValue, setDateValue] = useState("");
  const limitizeDate = (event, pattern) => {
    if (event.target.value.length == 0) {
      setDateValue("");
    } else {
      let valueTest = pattern.exec(event.target.value);
      if (valueTest.index == 0) {
        setDateValue(event.target.value);
      }
    }
  };
  // year field limition
  const [yearValue, setYearValue] = useState("");
  const limitizeYear = (event, pattern) => {
    if (event.target.value.length == 0) {
      setYearValue("");
    } else {
      let valueTest1 = pattern.test(event.target.value);
      if (valueTest1 || event.target.value.length < 4) {
        setYearValue(event.target.value);
      }
    }
  };

  const style = {
    control: (base) => ({
      ...base,
      border: "1px solid #EAEFF3 !important",
      // This line disable the blue border
      boxShadow: "none",
      borderRadius: "15px",
      padding: "15px 24px",
      background: "#F8F8F8",
      color: "red",
    }),
  };

  const filterLocationOption = (inputValue) => {
    if (inputValue.length > 1) {
      return auth.locations?.filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    } else {
      let result = auth.locations?.filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      return result.splice(0, 80);
    }
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterLocationOption(inputValue));
    }, 1000);
  };

  // react hook form

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      select: {},
    },
  });
  const onSubmit = async (fData) => {
    // console.log(fData);
    setLoader(true);
    const data = {
      user_id: JSON.parse(localStorage.getItem("sparrowSignIn"))?.user?.id,
      gender: parseInt(gender1),
      dob: `${fData.year}-${fData.month}-${fData.day}`,
      minimum_hourly_rate: 0,
      college: fData.collegeName,
    };
    const userApi_data = {
      location: parseInt(fData.location.value),
    };

    // calling Api on condition
    // hit the below api if it is not first time
    if (localStorage.getItem("stepForms")) {
      // const resp = await updateStudentDetail(data)
      // const resp_user = await updateUser(userApi_data)

      let [resp, resp_user] = await Promise.all([
        updateStudentDetail(data),
        updateUser(userApi_data),
      ]);

      if (resp.status === 200 && resp_user.status === 200) {
        Swal.fire({
          title: resp.data.message,
          timer: 1500,
          icon: "success",
          showConfirmButton: false,
        });
        setTimeout(() => {
          navigate("/signUpRoute/step-two");
        }, 2200);
      } else {
        Swal.fire({
          title: resp.data.message,
          timer: 1500,
          icon: "error",
          showConfirmButton: false,
        });
        setLoader(false);
      }
    }
    // hit the below api if it is first time
    else {
      let [resp, resp_user] = await Promise.all([
        createStudent(data),
        updateUser(userApi_data),
      ]);

      if (resp.status === 200 && resp_user.status === 200) {
        Swal.fire({
          title: resp.data.message,
          timer: 1500,
          icon: "success",
          showConfirmButton: false,
        });
        // adding alue in local storage so that we can check when user update
        localStorage.setItem("stepForms", JSON.stringify("stepOne"));
        setTimeout(() => {
          navigate("/signUpRoute/step-two");
        }, 2200);
      } else {
        Swal.fire({
          title: resp.data.message,
          timer: 1500,
          icon: "error",
          showConfirmButton: false,
        });
        setLoader(false);
      }
    }
  };

  return (
    // profile info
    <>
      <div className="createAccount mbb-heading-font">
        {/* <div className='mb-green-arrow'>
                    <Link to="/step-two">
                        <img src="./assets/images/Vector_backIcon.svg" alt='' />
                    </Link>
                </div> */}
        <div style={{ zIndex: "9999" }} className="mb-green-arrow">
          <Link to="/">
            <img src="./assets/images/Vector_backIcon.svg" alt="" />
          </Link>
        </div>
        <div className="block-img-mb mb-head-img">
          <img src="/assets/images/Ellipse511.png" alt="123" />
        </div>
        {/* desktopStep */}
        <div className="stOneDiv setResonive">
          <img src="/assets/images/offer/stepOneDesktop.svg" alt="" />
        </div>
        {/* mobileStep */}
        <div className="stOneDivResp setResonive1">
          <img src="/assets/images/offer/stepOneMobile.svg" alt="" />
        </div>

        <h2 className="mb-50">Profile Info</h2>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="createAccountForm mb-createAccountForm"
          >
            <div className="inner">
              <div className="mb35">
                <p className="mb-1">Gender</p>
                <div className="gnder d-flex mb-non-mar">
                  <div className="selectGEndrDiv">
                    <input
                      type="radio"
                      value="1"
                      onChange={selectGender}
                      id="radioMale"
                      checked={gender1 === "1"}
                    />
                    <label
                      htmlFor="radioMale"
                      className="secondary gender-mb setColor"
                    >
                      Male
                    </label>
                  </div>
                  <div className="selectGEndrDiv">
                    <input
                      type="radio"
                      value="2"
                      onChange={selectGender}
                      id="radioFemale"
                      checked={gender1 === "2"}
                    />
                    <label
                      htmlFor="radioFemale"
                      className="secondary gender-mb setColor"
                    >
                      Female
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb35">
                <p className="mb-1">Birth Date</p>
                <div className="bDate">
                  <input
                    placeholder="MM"
                    className="bDateInput bdate-mb"
                    type="number"
                    value={monthValue}
                    {...register("month", {
                      required: true,
                      min: 1,
                      max: 12,
                      maxLength: 2,
                      onChange: (e) => limitizeMonth(e, /(0?[1-9]|1[012])$/),
                      value: { monthValue },
                    })}
                  />
                  <input
                    placeholder="DD"
                    className="bDateInput bdate-mb"
                    type="number"
                    maxLength="2"
                    value={dateValue}
                    {...register("day", {
                      required: true,
                      min: 1,
                      max: 31,
                      maxLength: 2,
                      onChange: (e) =>
                        limitizeDate(e, /([1-9]|[12][0-9]|30|31)$/),
                      value: { dateValue },
                    })}
                  />
                  <input
                    placeholder="YYYY"
                    className="bDateInput bdate-mb-1"
                    type="number"
                    maxLength="4"
                    value={yearValue}
                    {...register("year", {
                      required: true,
                      min: 1900,
                      maxLength: 4,
                      onChange: (e) => limitizeYear(e, /(19|20)[0-9][0-9]$/),
                      value: { yearValue },
                    })}
                  />
                </div>
                {errors.month && (
                  <span className="eror">Month must be between 1 and 12</span>
                )}
                {errors.day && (
                  <span className="eror">Day must be between 1 and 31</span>
                )}
                {errors.year && (
                  <span className="eror">
                    Year must be above 1900 and in 4 digits
                  </span>
                )}
              </div>

              <div className="mb35">
                <p className="mb-1">College Name</p>
                <div>
                  <input
                    placeholder="E.g. Foothill College"
                    className="createFormLInput input-mb-create"
                    type="text"
                    {...register("collegeName", { required: true })}
                  />
                </div>
                {errors.collegeName && (
                  <span className="eror">This field is required</span>
                )}
              </div>
              <div className="mb35">
                <p className="mb-1">Location</p>
                <div>
                  <Controller
                    name="select"
                    control={control}
                    {...register("location", { required: true })}
                    render={({ field }) => (
                      <AsyncSelect
                        {...field}
                        className="StepOneSelect StepLocationSelect font15 mt-20"
                        cacheOptions
                        loadOptions={loadOptions}
                        defaultOptions={auth.locations?.slice(0, 50)}
                        placeholder="Enter your city or zip code"
                      />
                    )}
                  />
                </div>
                {errors.location && (
                  <span className="eror">This field is required</span>
                )}
              </div>
              <div className="gnder d-flex mb-d-flex">
                {loader ? (
                  <div className="relative">
                    <div className="loader alignLoader"></div>
                    <input
                      type="button"
                      disabled
                      value="Continue"
                      className="primary pl40 gender-mb-1"
                    />
                  </div>
                ) : (
                  <input
                    type="submit"
                    value="Continue"
                    className="primary gender-mb-1"
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <LowerCircle />
    </>
  );
};

export default CreateAccount;
