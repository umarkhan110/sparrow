import React from 'react'
import { NavLink } from "react-router-dom";
import { sideBarList } from '../dashboardnavsidebar/SideBarList';

const FooterNav = () => {
    // user role
    const role = (JSON.parse(localStorage.getItem('sparrowSignIn'))?.user.role);

    return (
        <div className='footerMenu container'>
            {
                sideBarList.map((item) => {
                    return <>
                        {item.type === "global" && role === "student" ?
                            <NavLink to={item?.slink ? item?.slink : ""}
                                className="sidebarIconss footerIcons">
                                <img src={item.imagePath} className="sidebarIcon" alt="" />
                                <img src={item.imagePathHover} className="sidebarIcon2" alt="" />
                            </NavLink>
                            :
                            item.type === "global" && role === "client" ?
                                <NavLink to={item.clink ? item.clink : ""}
                                    className="sidebarIconss footerIcons">
                                    <img src={item.imagePath} className="sidebarIcon" alt="" />
                                    <img src={item.imagePathHover} className="sidebarIcon2" alt="" />
                                </NavLink>
                                :
                                item.type === "student" && role === "student" ?
                                    <NavLink to={item.slink ? item.slink : ""}
                                        className="sidebarIconss footerIcons">
                                        <img src={item.imagePath} className="sidebarIcon" alt="" />
                                        <img src={item.imagePathHover} className="sidebarIcon2" alt="" />
                                    </NavLink> :
                                    item.type === "client" && role === "client" ?
                                        <NavLink to={item.clink ? item.clink : ""}
                                            className="sidebarIconss footerIcons">
                                            <img src={item.imagePath} className="sidebarIcon" alt="" />
                                            <img src={item.imagePathHover} className="sidebarIcon2" alt="" />
                                        </NavLink>
                                        :
                                        ""
                        }
                    </>
                })
            }
        </div>
    )
}

export default FooterNav