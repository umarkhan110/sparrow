import React from 'react'
import {
    Navigate,
    Route,
    Routes as Switch,
    HashRouter as Router,
} from "react-router-dom";
import DashbaoardRoutes from '../routes/DashbaoardRoutes';
import SignInRoutes from '../routes/SignInRoutes';
import SignUpRoutes from '../routes/SignUpRoutes';
import SignIn from "./customerforms/Signin";
import DashboardNav from './dashboardnavsidebar/DashboardNav';
import Sidebar from './dashboardnavsidebar/SideBar';
import FooterNav from "../Components/mobilefooternav/FooterNav";
import ContactUsIcon from "../Components/contactus/ContactUsIcon";
import HomeMain from './Home/HomeMain';
import NavbarSignedIn from './navbarsignedinLayout/NavbarSignedIn';
import SignUpStudent from './signup/SignUpStudent';
import SignUpLayout from './signup/SignUpLayout';
import TermsOfServices from './termofservice/TermsOfServices';
import SparrowUserPledge from './termofservice/SparrowUserPledge';
import PrivacyPolicy from './termofservice/PrivacyPolicy';
import Offer from './offers/Offer';
import ResetEmail from './verification/ResetEmail';
import { useNavigate } from 'react-router-dom';
import AxiosInterceptorsSetup from '../useAxiosNavigation';



const Routes = () => {
    // AxiosInterceptorsSetup is a functional component handling interceptors || created AxiosInterceptorsSetup then write below code of AxiosInterceptorNavigate() here in routes for unauthenticated
    function AxiosInterceptorNavigate() {
        let navigate = useNavigate();
        AxiosInterceptorsSetup(navigate);
        return <></>;
    }

    return (
        <Router >
            {< AxiosInterceptorNavigate />}
            <>
                <Switch>
                    {/* main homePage Route */}
                    <Route path="*" element={<Navigate to={'/'} />} />
                    <Route exact path="/" element={<NavbarSignedIn><HomeMain /></NavbarSignedIn>} />
                    {/* Main Routes */}
                    <Route path="signInRoute/*" element={<SignInRoutes />} />
                    <Route path="signUpRoute/*" element={<SignUpRoutes />} />
                    <Route path="dashboardRoute/*" element={<DashbaoardRoutes />} />
                    {/* verification of forgot pass */}
                    <Route path="/reset-password" element={<SignUpLayout><ResetEmail /></SignUpLayout>} />
                    {/* signinForm */}
                    <Route path="/signin" element={<SignUpLayout><SignIn /></SignUpLayout>} />
                    {/* dashboard testing compoennts*/}
                    <Route path="/dashboard-nav" element={<DashboardNav />} />
                    <Route path="/sidebar" element={<Sidebar />} />
                    <Route path="/ContactUsIcon" element={<ContactUsIcon />} />
                    {/* <Route path="/check" element={<DashboardLayout />} /> */}
                    {/* offer */}
                    <Route path="/offer" element={<Offer />} />
                    {/* mobileFooter Navbar */}
                    <Route path="/footNav" element={<FooterNav />} />
                    {/* student first signup Form */}
                    <Route path="/signup-student" element={<SignUpLayout><SignUpStudent /></SignUpLayout>} />
                    {/* terms page*/}
                    <Route path="/terms" element={<NavbarSignedIn><TermsOfServices /></NavbarSignedIn>} />
                    {/* userPledge */}
                    <Route path="/sparrow-user-pledge" element={<NavbarSignedIn><SparrowUserPledge /></NavbarSignedIn>} />
                    {/* privacy policy */}
                    <Route path="/privacy-policy" element={<NavbarSignedIn><PrivacyPolicy /></NavbarSignedIn>} />

                </Switch>
            </>
        </Router>

    )
}

export default Routes