import { useContext } from "react";
import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthContext";
import { logout } from "../../services/authentication/Logout";
import { getAllNotifications } from "../../services/notifications/GetNotifications";
import { sideBarList } from "./SideBarList";
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
    const auth = useContext(AuthContext);
    const location = useLocation()

    //  we have to call getFunc for showing Notifiactions in sidebar so whenever a new notification comes user can see it while on rendering || location is used because it qill force the function to call on URL change in which sidebar will be shown
    let user_id = (JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id)

    const getFunc = async () => {
        // console.log("sidebar");
        // debugger
        const optionNotifications = [];
        const resp = await getAllNotifications(user_id);
        resp.data?.notification?.map(single => {
            return optionNotifications.push(single)
        })
        auth.addNotifications(optionNotifications);
    };
    useEffect(() => {
        getFunc()
        // return () => {
        //     // cleanup when component unmounts
        //     console.log("leaving checkout", location);
        // }
    }, [location])

    const navigate = useNavigate()
    // user role
    const role = (JSON.parse(localStorage.getItem('sparrowSignIn'))?.user.role);
    // logout
    const logOut = async () => {
        const data = {
            email: JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.email
        }
        // calling Api
        const resp = await logout(data);
        if (resp.status !== 200) {
            Swal.fire({
                title: resp.data.message,
                timer: 1500,
                icon: 'error',
                showConfirmButton: false,
            })
            // due to unauthorized 401 error
            localStorage.removeItem('sparrowSignIn');
            setTimeout(() => {
                navigate("/signin");
            }, 1000);
        }
        else {
            // geting local storage values for removing from session
            localStorage.removeItem('sparrowSignIn');
            navigate("/signin");
        }
    }

    // notificaction come any where in website and even we refresh it also stays
    // useEffect(() => {
    //     if (sessionStorage.getItem("parentWithClass")) {
    //         let id = document.getElementById("571")
    //         id.classList.add(sessionStorage.getItem("parentWithClass"))
    //     }
    // }, [])

    // removing session
    // const removeClassSession = (id) => {
    //     if (id === "571") {
    //         sessionStorage.removeItem("parentWithClass")
    //         // selectdot class added for capturing element with unique class
    //         let el = document.querySelector(".selectdot")
    //         el.classList.remove("dot")
    //     }
    // }

    return (
        <div className="Dashboard">
            <div className="sidenav">
                <div>
                    {
                        // onClick={() => removeClassSession(item.id)}
                        // onClick={() => removeClassSession(item.id)}
                        sideBarList.map((item) => {

                            return <>
                                {item.type === "global" && role === "student" ?
                                    <NavLink

                                        to={item?.slink ? item?.slink : ""}
                                        className={`sidebarIconss`}
                                        id={item.id}
                                    >
                                        <img src={item.imagePath} className="sidebarIcon" alt="" />
                                        <img src={item.imagePathHover} className="sidebarIcon2" alt="" />
                                        <span className="sideNav-text">
                                            {item.linkName}
                                        </span>
                                    </NavLink>
                                    :
                                    item.type === "global" && role === "client" ?

                                        <NavLink
                                            to={item.clink ? item.clink : ""}
                                            className={`sidebarIconss`}
                                            id={item.id}
                                        >
                                            <img src={item.imagePath} className="sidebarIcon" alt="" />
                                            <img src={item.imagePathHover} className="sidebarIcon2" alt="" />
                                            <span className="sideNav-text">
                                                {item.linkName}
                                            </span>
                                        </NavLink>
                                        :
                                        item.type === "student" && role === "student" ?
                                            <NavLink to={item.slink ? item.slink : ""}
                                                className="sidebarIconss">
                                                <img src={item.imagePath} className="sidebarIcon" alt="" />
                                                <img src={item.imagePathHover} className="sidebarIcon2" alt="" />
                                                <span className="sideNav-text">
                                                    {item.linkName}
                                                </span>
                                            </NavLink>
                                            :
                                            item.type === "client" && role === "client" ?
                                                <NavLink to={item.clink ? item.clink : ""}
                                                    className="sidebarIconss">
                                                    <img src={item.imagePath} className="sidebarIcon" alt="" />
                                                    <img src={item.imagePathHover} className="sidebarIcon2" alt="" />
                                                    <span className="sideNav-text">
                                                        {item.linkName}
                                                    </span>
                                                </NavLink>
                                                :
                                                ""
                                }
                            </>
                        })
                    }
                </div>
                <div className="lowrIcon">
                    <Link to='' className="sidebarIconss">
                        <img onClick={logOut} className="sidebarIcon" src="/assets/images/sidebar/shutdown.svg" alt="" />
                        <span className="sideNav-text">
                            Log Out
                        </span>
                    </Link>
                </div>
            </div>
        </div >
    );
}

export default Sidebar;