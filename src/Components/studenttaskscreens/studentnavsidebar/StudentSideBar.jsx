import React from 'react'
import { NavLink } from "react-router-dom";

const StudentSideBar = () => {
  return (
    <div>
         <div className="sidenav">
                {/* <div className="sidebarContainer"> */}
                {/* <div className="sidebar-icons"> */}
                    <div>
                        <NavLink to='/aa' className="sidebarIconss">
                            <img src="/assets/images/sidebar/Home.svg" className="sidebarIcon" alt="" />
                            <img src="/assets/images/sidebar/Home1.svg" className="sidebarIcon2" alt="" />
                        </NavLink>
                        <NavLink to='' className="sidebarIconss">
                            <img className="sidebarIcon" src="/assets/images/sidebar/paperSidebar.svg" alt="" />
                            <img className="sidebarIcon2" src="/assets/images/sidebar/paper1.svg" alt="" />
                        </NavLink>
                        {/* <NavLink to='' className="sidebarIconss">
                            <img className="sidebarIcon" src="/assets/images/sidebar/srchSidebar.png" alt="" />
                            <img className="sidebarIcon2" src="/assets/images/sidebar/srch1.png" alt="" />
                        </NavLink> */}
                        <NavLink to='' className="sidebarIconss">
                            <img className="sidebarIcon" src="/assets/images/studentsidebar/bnk.svg" alt="" />
                            <img className="sidebarIcon2" src="/assets/images/studentsidebar/bnk.svg" alt="" />
                        </NavLink>
                        <NavLink to='' className="sidebarIconss">
                            <img className="sidebarIcon" src="/assets/images/sidebar/Commentsidebar.svg" alt="" />
                            <img className="sidebarIcon2" src="/assets/images/sidebar/Comment1.svg" alt="" />
                        </NavLink>
                        <NavLink to='' className="sidebarIconss">
                            <img className="sidebarIcon" src="/assets/images/sidebar/bell.svg" alt="" />
                            <img className="sidebarIcon2" src="/assets/images/sidebar/bell1.svg" alt="" />
                        </NavLink>
                    </div>
                    <div className="lowrIcon">
                        <NavLink to='' className="sidebarIconss">
                            <img className="sidebarIcon" src="/assets/images/sidebar/shutdown.svg" alt="" />
                            <img className="sidebarIcon2" src="/assets/images/sidebar/shutdown.svg" alt="" />
                        </NavLink>
                    </div>
                </div>
    </div>
  )
}

export default StudentSideBar