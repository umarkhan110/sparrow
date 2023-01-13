import { useState, useEffect, useContext } from 'react';
import { useForm, Controller } from "react-hook-form";
import { timeSlots, days } from '../../services/availibility&timeslots/Availibility';
import Select from "react-select";
import AsyncSelect from 'react-select/async';
import { getLocations } from '../../services/locations/Locations';
import { SearchStudent } from '../../services/users/SearchStudent';
import Swal from 'sweetalert2';
import AuthContext from '../../context/AuthContext';

const AdvacnceSearchBar = (props) => {
    
    const [loder, setLoder] = useState(true);

    const auth = useContext(AuthContext);
    // get location
    // const [locations, setlocations] = useState([])
    // const locationsFunc = async () => {
    //     const resp = await getLocations();
    //     setlocations(resp.data)
    // }

    const [adv_toBeShow, setAdv_toBeShow] = useState(true)
    
    const handleToBeShow = () => {
        if (adv_toBeShow) {
            setAdv_toBeShow(false)
        } else setAdv_toBeShow(true)
    }
    const imageForDropDownAdv = (adv_toBeShow)? "/assets/images/viewAll/ArrowUp.svg" : "/assets/images/viewAll/ArrowDown.svg"

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
    
    // get working days
    const [workdays, setworkdays] = useState();
    const getDaysFunc = async () => {
        const response = await days();
        
        if (response.status === 200) {
            setworkdays(response.data);
        } else {
            Swal.fire({
                title: response.data.message,
                timer: 1500,
                icon: "error",
                showConfirmButton: false,
            });
        }
    };
    
    
    useEffect(() => {
        // locationsFunc();
        getDaysFunc();
        getTimeFunc();
    }, []);

    // const optionlocation = [];
    // if(locations.length > 0){
    //     locations.map((singleLocation => {
    //         return optionlocation.push({
    //             'label': singleLocation.city+','+singleLocation.zip,
    //             'value': singleLocation.id
    //         })
    //     }))
    // }

    const optionDay = [];
    if (workdays?.length > 0) {
        let order = { monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6, sunday: 7 };

        workdays.sort(function (a, b) {
            return order[a.day] - order[b.day];
        });

        workdays?.map((singleDay => {
            return optionDay.push({
                'label': singleDay?.day.charAt(0).toUpperCase() + singleDay?.day.slice(1),
                'value': singleDay.id
            })
        }))
    }

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
        if(inputValue.length > 1){
            return auth.locations?.filter((i) =>
                i.label.toLowerCase().includes(inputValue.toLowerCase())
            );
        } else {
            let result = auth.locations?.filter((i) =>
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

    const {control, register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = async (fData) => {
       
        let dataObj= { skills: fData.taskInputValue};
        if(fData.daySearch){
            dataObj["day"] = parseInt(fData.daySearch?.value)
        }
        if(fData.timeSearch){
            dataObj["start_time"] = parseInt(fData.timeSearch?.value)
        }
        if(fData.licenseOrVehicle && fData.licenseOrVehicle=="driverLicense"){
            dataObj["licence"] = 1
        } else if(fData.licenseOrVehicle && fData.licenseOrVehicle=="OwnVehicle"){
            dataObj["vehicle"] = 1
        }
        if(fData.starRating){
            dataObj["rating"] = parseInt(fData.starRating)
        }
        if(fData.minWage){
            dataObj["minimum_hourly_rate"] = parseInt(fData.minWage)
        }

        //for location
        if(fData.location && fData.location.label){
            let arrayForCityZip = fData.location.label.split(",")
            dataObj["city"] = arrayForCityZip[0]
            dataObj["zip"] = parseInt(arrayForCityZip[1])
        }
        // console.log("advance search obj: ", dataObj)
        const resp = await SearchStudent(dataObj)
        if (resp.status === 200) {
            
            // console.log("advance search result: ",resp)
            if(resp?.data?.users.length == 0){
                Swal.fire({
                    title: "No user Found.",
                    timer: 1500,
                    icon: 'warning',
                    showConfirmButton: false,
                })
            } else{
                setTimeout(() => {
                    props.updateStudentResult(resp?.data?.users)
                    // navigate('/signUpRoute/step-two');
                }, 1200);
            }
        } else {
            Swal.fire({
                title: resp.data.message,
                timer: 1500,
                icon: 'error',
                showConfirmButton: false,
            })
            // setLoader(false)
            
        }


    }

    return (
        <div className='advanceSearch mt-5'>
            <form id='advanceSearchForm' onSubmit={handleSubmit(onSubmit)} className="stepForm">
                <div className='bannerFields viewStudentsField pb-4 reviewSection_dashbord row'>
                    <div style={{textAlign: 'left'}} className="col-lg-5 col-md-6 col-sm-6 col-12">
                        
                        <Controller
                            name="select"
                            className="border-0"
                            control={control}
                            {...register("location")}
                            render={({ field }) => 
                                <AsyncSelect {...field}  className="cityField border-0" cacheOptions loadOptions={loadOptions} defaultOptions={auth.locations?.slice(0, 50)} placeholder='Enter city or zip'/>
                            }
                        />
                    </div>
                    <div className="customSearchField  col-lg-7 col-md-6 col-sm-6 col-12" >
                        <input type="text" className='findTasksField' placeholder='Task' {...register("taskInputValue", { required: true , value: props?.valueFromHome } )}/>
                        {errors.taskInputValue && <span className='eror'>This field is required</span>}
                        <button type='submit' className="taskbutton primary center" >Find Student</button>
                    </div>
                </div>
                {/* <div className=''></div> */}
                <div className='advanceSearchHed'>
                    <div>
                        <h6> <span><img src="/assets/images/viewAll/advSearchIcon.svg" alt="" />&nbsp;&nbsp;&nbsp;</span>Advanced Search</h6>
                    </div>
                    <div>
                        <img src={imageForDropDownAdv} alt="" onClick={handleToBeShow} />
                    </div>
                </div>
                {adv_toBeShow &&
                    <div className='advanceSearchBody row'>
                        <div className='advanceBodyParts col-lg-3 col-md-4 col-sm-6 col-12'>
                            <div className='innerSetting'>
                                <h5 className='mb-2'>Time</h5>
                                <div className='selectDivAdv'>
                                    
                                    <Controller
                                        name="daySearch"
                                        control={control}
                                        render={({ field }) => <Select 
                                            {...field} 
                                            placeholder="Select day"
                                            className="advSelectViewAll mb-2"
                                            options={optionDay}
                                        />}
                                    />
                                   
                                    
                                    <Controller
                                        name="timeSearch"
                                        control={control}
                                        render={({ field }) => <Select 
                                            {...field} 
                                            placeholder="Select time"
                                            className="advSelectViewAll mb-2"
                                            options={optionTime}
                                        />}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='advanceBodyParts advBodyPart_margin col-lg-3 col-md-4 col-sm-6 col-12'>
                            <div className='innerSetting'>
                                <h5 className='mb-2'>Rating</h5>
                                <div className='ratingStars'>
                                    <div className="pretty p-default p-round advanceBtn">
                                        <input name="rating" id="starRating" value="3" type="radio" {...register("starRating")}/>
                                        <div className="state p-success-o">
                                            <label></label>
                                        </div>
                                    </div>
                                    <div className='ms-1'>
                                        <img src="/assets/images/home/Star 8.svg" alt="" />
                                        <img src="/assets/images/home/Star 8.svg" alt="" />
                                        <img src="/assets/images/home/Star 8.svg" alt="" />
                                        <img src="/assets/images/customerDashboard/dullStarForAdvSearch.svg" alt="" />
                                        <img src="/assets/images/customerDashboard/dullStarForAdvSearch.svg" alt="" />
                                    </div>
                                </div>
                                <div className='ratingStars'>
                                    <div className="pretty p-default p-round advanceBtn">
                                        <input name="rating" id="starRating" value="4" type="radio" {...register("starRating")}/>
                                        <div className="state p-success-o">
                                            <label></label>
                                        </div>
                                    </div>
                                    <div className='ms-1'>
                                        <img src="/assets/images/home/Star 8.svg" alt="" />
                                        <img src="/assets/images/home/Star 8.svg" alt="" />
                                        <img src="/assets/images/home/Star 8.svg" alt="" />
                                        <img src="/assets/images/home/Star 8.svg" alt="" />
                                        <img src="/assets/images/customerDashboard/dullStarForAdvSearch.svg" alt="" />
                                    </div>
                                </div>
                                <div className='ratingStars align-items-center'>
                                    <div className="pretty p-default p-round advanceBtn">
                                        <input name="rating" id="starRating" value="5" type="radio" {...register("starRating")} />
                                        <div className="state p-success-o">
                                            <label></label>
                                        </div>
                                    </div>
                                    <div className='ms-1'>
                                        <img src="/assets/images/home/Star 8.svg" alt="" />
                                        <img src="/assets/images/home/Star 8.svg" alt="" />
                                        <img src="/assets/images/home/Star 8.svg" alt="" />
                                        <img src="/assets/images/home/Star 8.svg" alt="" />
                                        <img src="/assets/images/home/Star 8.svg" alt="" />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='advanceBodyParts advBodyPart_margin col-lg-3 col-md-4 col-sm-6 col-12'>
                            <div className='innerSetting'>
                                <h5 className='mb-2'>Hourly Wage</h5>
                                <div className='advanceBodyDistance'>
                                    <div className='d-flex align-items-center flex-row mt-1'>
                                        <div className="pretty p-default p-round advanceBtn">
                                            <input name="minWage" id="minWage" value="20" type="radio" {...register("minWage")} />
                                            <div className="state p-success-o">
                                                <label></label>
                                            </div>
                                        </div>
                                        <div className='ms-1'>
                                            <div className="state p-success-o">
                                                <label>$20</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='d-flex align-items-center flex-row mt-1'>
                                        <div className="pretty p-default p-round advanceBtn">
                                            <input name="minWage" id="minWage" value="30" type="radio" {...register("minWage")} />
                                            <div className="state p-success-o">
                                                <label></label>
                                            </div>
                                        </div>
                                        <div className='ms-1'>
                                            <div className="state p-success-o">
                                                <label>$30</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='d-flex align-items-center flex-row mt-1'>
                                        <div className="pretty p-default p-round advanceBtn">
                                            <input name="minWage" id="minWage" value="40" type="radio" {...register("minWage")} />
                                            <div className="state p-success-o">
                                                <label></label>
                                            </div>
                                        </div>
                                        <div className='ms-1'>
                                            <div className="state p-success-o">
                                                <label>$40</label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                   
                                </div>
                            </div>
                        </div>
                        <div className='advanceBodyParts advBodyPart_margin col-lg-3 col-md-4 col-sm-6 col-12'>
                            <div className='innerSetting'>
                                <h5 className='mb-2'>Transportation</h5>
                                <div className='advanceBodyDistance'>
                                    

                                    <div className='d-flex align-items-center flex-row mt-1'>
                                        <div className="pretty p-default p-round advanceBtn">
                                            <input name="transportation" id="driver’s License" value="driverLicense" type="radio" {...register("licenseOrVehicle")}/>
                                            <div className="state p-success-o">
                                                <label></label>
                                            </div>
                                        </div>
                                        <div className='ms-1'>
                                            <div className="state p-success-o">
                                            <label>Driver’s License</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='d-flex align-items-center flex-row mt-1'>
                                        <div className="pretty p-default p-round advanceBtn">
                                            <input name="transportation" id="Own Vehicle" value="OwnVehicle" type="radio" {...register("licenseOrVehicle")}/>
                                            <div className="state p-success-o">
                                                <label></label>
                                            </div>
                                        </div>
                                        <div className='ms-1'>
                                            <div className="state p-success-o">
                                            <label>Own Vehicle</label>
                                            </div>
                                        </div>
                                    </div>

                                   
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </form>
        </div>
    )
}

export default AdvacnceSearchBar