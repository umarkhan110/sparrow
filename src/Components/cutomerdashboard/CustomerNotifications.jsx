import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { updateNotification } from '../../services/notifications/UpdateNotifications'
import FooterNav from '../mobilefooternav/FooterNav'

const CustomerNotifications = () => {
    const auth = useContext(AuthContext);
    const [loder, setLoder] = useState(true);
    const [notifications, setNotifications] = useState([]);

    const getFunc = () => {
        if (auth.notifications.length > 0) {
            setLoder(false)
            setNotifications(auth.notifications)
        } else {
            setLoder(false)
        }
    }

    useEffect(() => {
        getFunc();
    }, [auth]);


    // updating notifications on click of bell icon and removing dot
    useEffect(() => {
        // debugger
        const unreadNotifications = auth?.notifications?.filter((item) => {
            return item.read_at === null
        })
        if (unreadNotifications?.length > 0) {
            updateNotificationFunc(unreadNotifications)
        };

    }, [])

    const updateNotificationFunc = async (unreadNotifications) => {

        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${year}-${month}-${day}`;

        const data = {
            read_at: currentDate
        }
        // debugger
        // hitting updateApi multiple times until it updates all
        for (const element of unreadNotifications) {
            const resp = await updateNotification(element.id, data);
            if (resp.status === 200) {
                if (document.getElementById("571")) {
                    let id = document.getElementById("571")
                    id.classList.remove("dot")
                    // clearing notifications so dot icon does not show up agian and again
                    auth.clearNotifications()

                }
            }
        }
    }

    return (
        <div className='bgNotiLines mb-notification-customer'>
            <Container>
                <h2 className='text-center'>My <span className='green'>Notification</span></h2>
                {
                    loder ?
                        <div className="height100vh">
                            <div className="lds-spinner">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        :
                        <div className='notificationsMainDiv px-5'>
                            {notifications?.length > 0 ?
                                notifications?.map(item => {
                                    return (
                                        <Link
                                            // dot
                                            key={item?.id}
                                            className='notification'
                                            to={item?.data?.action_url}>
                                            <div>
                                                <img src="/assets/images/userimg.png" alt="" />
                                            </div>
                                            <div className='ml25'>
                                                <h5 className='notificationH5'>{item?.notification_from?.first_name}</h5>
                                                <p
                                                    className='notificationP'>
                                                    {item?.data?.message} &nbsp;
                                                    <span className='green'>View More</span>
                                                </p>
                                            </div>
                                        </Link>
                                    )
                                })
                                : <div className='notification'>
                                    <p className='notificationP'>
                                        No Current Notifications
                                    </p>
                                </div>
                            }
                        </div>
                }
            </Container>
            <FooterNav />
        </div>
    )
}

export default CustomerNotifications