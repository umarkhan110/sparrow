import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CustomerMyStudents from "../Components/cutomerdashboard/CustomerMyStudents";
import CustomerPreviousStudent from "../Components/cutomerdashboard/CustomerPreviousStudent";
import CustomerInviteStudents from "../Components/cutomerdashboard/CustomerInviteStudents";
import CustomerCreateTask from "../Components/cutomerdashboard/CustomerCreateTask";
import DashboardNoFooter from "../Components/dashboardnavsidebar/DashboardNoFooter";
import CustomerNotifications from "../Components/cutomerdashboard/CustomerNotifications";
import CustomerOrderDetails from "../Components/cutomerdashboard/CustomerOrderDetails";
import CustomerTaskDetails from "../Components/cutomerdashboard/CustomerTaskDetails";
import CustomerFeedback from "../Components/cutomerdashboard/CustomerFeedback";
import CustomerMyProfile from "../Components/cutomerdashboard/CustomerMyProfile";
import CustomerStudentProfile from "../Components/cutomerdashboard/CustomerStudentProfile";
import StudentTaskDescp from "../Components/studenttaskscreens/StudentTaskDescp";
import StudentTaskHistory from "../Components/studenttaskscreens/StudentTaskHistory";
// import StudentEarnings from "../Components/studenttaskscreens/StudentEarnings";
import StudentNotifications from "../Components/studenttaskscreens/StudentNotifications";
import StudentProfileView from "../Components/studenttaskscreens/StudentProfileView";
import PrivateRouteClient from '../Components/privateroutes/PrivateRouteClient';
import PrivateRouteStudent from '../Components/privateroutes/PrivateRouteStudent';
import ChatMain from '../Components/chats/ChatMain';
import CustomerViewAllStudents from '../Components/viewallstudents/CustomerViewAllStudents';
import PrivateRouteChat from '../Components/privateroutes/PrivateRouteAdmin';

// payment
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
import BankDetailModal from '../Components/modals/BankDetailModal';

// const stripePromise = loadStripe('pk_test_51LvW3OJtf93btUdu341wd5TlFrMpYbipHB3jPjgyNxp3F6eANDnL9NL74bn0sIdTdszNpSI3DxN5I2cGVJSOjOCg00UKagcoTx');

const DashbaoardRoutes = () => {
    return (
        <div>
            <Routes>
                {/* customer routes */}
                <Route path="my-students" element={<PrivateRouteClient><DashboardNoFooter><CustomerMyStudents /></DashboardNoFooter></PrivateRouteClient>} />
                <Route path="my-students/previous-students" element={<PrivateRouteClient><DashboardNoFooter><CustomerPreviousStudent /></DashboardNoFooter></PrivateRouteClient>} />
                <Route path="/all-students" element={<PrivateRouteClient><DashboardNoFooter><CustomerViewAllStudents /></DashboardNoFooter></PrivateRouteClient>} />
                <Route path="/all-students/create-tasks/:studentId/:fcmToken" element={<PrivateRouteClient><DashboardNoFooter><CustomerCreateTask /></DashboardNoFooter></PrivateRouteClient>} />
                <Route path="/all-students/invite-students/:taskId/:orderId" element={<PrivateRouteClient><DashboardNoFooter><CustomerInviteStudents /></DashboardNoFooter></PrivateRouteClient>} />
                <Route path="customer-notification" element={<PrivateRouteClient><DashboardNoFooter><CustomerNotifications /></DashboardNoFooter></PrivateRouteClient>} />
                <Route path="customer-notification/order-details/:orderId" element={<PrivateRouteClient><DashboardNoFooter><CustomerOrderDetails /></DashboardNoFooter></PrivateRouteClient>} />
                <Route path="customer-notification/task-details/:taskId" element={<PrivateRouteClient><DashboardNoFooter><CustomerTaskDetails /></DashboardNoFooter></PrivateRouteClient>} />
                {/* payment page || will add useParams for catching payment || :paymentFor parameter defines for which payment is going to taken 0 for order payment on continue button in customertask component and 1 or else for connects purchase payment*/}
                <Route path="customer-notification/payment/:invites/:taskId/:paymentFor" element={
                    <PrivateRouteClient>
                        <DashboardNoFooter>
                            {/* <Elements stripe={stripePromise}> */}
                            <BankDetailModal />
                            {/* </Elements> */}
                        </DashboardNoFooter>
                    </PrivateRouteClient>
                } />

                <Route path="feedback/:orderId" element={<PrivateRouteClient><DashboardNoFooter><CustomerFeedback /></DashboardNoFooter></PrivateRouteClient>} />
                <Route path="customer-profile" element={<PrivateRouteClient><DashboardNoFooter><CustomerMyProfile /></DashboardNoFooter></PrivateRouteClient>} />
                <Route path="all-students/customer-student-profile/:userID" element={<PrivateRouteClient><DashboardNoFooter><CustomerStudentProfile /></DashboardNoFooter></PrivateRouteClient>} />
                {/*  */}

                {/* student routes */}
                <Route path="/chatStudent/student-task-descp/:taskId/:orderId" element={<PrivateRouteStudent><DashboardNoFooter><StudentTaskDescp /></DashboardNoFooter></PrivateRouteStudent>} />
                <Route path="task-history" element={<PrivateRouteStudent><DashboardNoFooter><StudentTaskHistory /></DashboardNoFooter></PrivateRouteStudent>} />
                {/* <Route path="student-earnings" element={<PrivateRouteStudent><DashboardNoFooter><StudentEarnings /></DashboardNoFooter></PrivateRouteStudent>} /> */}
                <Route path="student-profile" element={<PrivateRouteStudent><DashboardNoFooter><StudentProfileView /></DashboardNoFooter></PrivateRouteStudent>} />
                <Route path="student-notifications" element={<PrivateRouteStudent><DashboardNoFooter><StudentNotifications /></DashboardNoFooter></PrivateRouteStudent>} />

                {/*  chat */}
                <Route path="chatStudent" element={<PrivateRouteChat><DashboardNoFooter><ChatMain /></DashboardNoFooter></PrivateRouteChat>} />
            </Routes>
        </div >
    )
}

export default DashbaoardRoutes