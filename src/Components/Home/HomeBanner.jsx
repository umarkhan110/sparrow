import React, { useContext } from "react";

import { Controller, useForm } from "react-hook-form";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { SearchStudent } from "../../services/users/SearchStudent";
import Swal from "sweetalert2";
import AsyncSelect from 'react-select/async';
import AuthContext from "../../context/AuthContext";

function HomeBanner() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();

  const auth = useContext(AuthContext);

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

  const onSubmit = async (fData) => {
    let dataObj = {};

    if (parseInt(fData.location, 10)) {
      dataObj["zip"] = parseInt(fData.location);
    } else {
      dataObj["city"] = fData.location;
    }

    dataObj["skills"] = fData.taskInputValue;

    const resp = await SearchStudent(dataObj);
    if (resp.status === 200) {
      if (resp?.data?.users.length == 0) {
        Swal.fire({
          title: "No user Found.",
          timer: 1500,
          icon: "warning",
          showConfirmButton: false,
        });
      } else {
        setTimeout(() => {
          navigate("/signInRoute/all-students", {
            state: { query: resp?.data?.users, defaultValue: fData },
          });
        }, 1200);
      }
    } else {
      Swal.fire({
        title: resp.data.message,
        timer: 1500,
        icon: "error",
        showConfirmButton: false,
      });
    }

    //
  };

  return (
    <div className="banner center bannerMain logInClass">
      <Container>
        <Row className="columnRevers">
          <Col md={7} sm={12} className="paddingLft20 mainbannerTextPart">
            <h2>
              Everyday Tasks Made Easier with a{" "}
              <span className="green">College Student</span>
            </h2>
            <div className="seth6width">
              <h6>
                Hire a local college student to carry out your daily errands and
                tasks. Connect with a trustworthy student for your task within a
                few minutes.
              </h6>
            </div>
            <div className="bannerFields">
              <form
                id="homeSearchForm"
                className="bannerFields row"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex1 col-md-6 col-sm-12">
                  {/* <input type="text" className='cityField homePageCityField' placeholder='City or Zip Code' {...register("location", { required: true })} /> */}
                  <Controller
                    name="select"
                    className="border-0"
                    control={control}
                    {...register("location")}
                    render={({ field }) => (
                      <AsyncSelect
                        {...field}
                        className="cityField border-0"
                        cacheOptions
                        loadOptions={loadOptions}
                        defaultOptions={auth.locations?.slice(0, 50)}
                        placeholder="Enter city or zip"
                      />
                    )}
                  />
                  {errors.location && (
                    <span className="eror">This field is required</span>
                  )}
                </div>
                <div className="customSearchField flex2 col-md-6 col-sm-12">
                  <input
                    type="text"
                    className="findTasksField"
                    placeholder="Task"
                    {...register("taskInputValue", { required: true })}
                  />
                  <button className="taskbutton primary center">
                    Find Student
                  </button>
                  {errors.taskInputValue && (
                    <span className="eror">This field is required</span>
                  )}
                </div>
              </form>
            </div>

            <div className="bannerLogos setResonive">
              <img src="/assets/images/home/Trusted by.svg" alt="" />

              <img src="/assets/images/home/la.svg" alt="" />
              <img src="/assets/images/home/menloCollege.svg" alt="" />
              <img src="/assets/images/home/stanfordUniversity.svg" alt="" />
            </div>

            <div className="makeMobileOnly setResonive1 trust_mobileImage">
              <img src="/assets/images/home/Trusted by.svg" alt="" />
            </div>
            <div className="makeMobileOnly setResonive1 bannerLogos_mobile">
              <img src="/assets/images/home/menloCollege.svg" alt="" />
              <img
                src="/assets/images/home/mobileSchoolLogo/la_mobile.svg"
                alt=""
              />
              <img src="/assets/images/home/stanfordUniversity.svg" alt="" />
            </div>
          </Col>
          <Col md={5} sm={12} className="mainbannerImagePart">
            <div className="banerkiImgDiv">
              <img
                className="mainHomeBannerImage"
                src="/assets/images/home/bannerImg.png"
                alt=""
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomeBanner;
