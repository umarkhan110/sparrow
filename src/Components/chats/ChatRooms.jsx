import React, { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app';
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
} from "firebase/firestore"
import { firebaseConfig } from '../../firebase/FireBase';
import moment from 'moment'
import { saveStudent } from '../../services/savestudents/SaveStudent';
import { getAllSaveStudents } from '../../services/savestudents/GetAllStudents';
import { savedStdArray } from './ChatArray';
import { Fragment } from 'react';

const ChatRooms = (({ userId, getMessages, roomId, lastMessage, lastTime }) => {

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app)

    let user_id = (JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.id.toString();
    let user_Role = (JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role;


    let finalLastTime = moment.unix(lastTime / 1000).calendar();

    //3. getting details of other users in usersList || users are stored in item
    const [item, setItem] = useState([])


    useEffect(() => {
        getUserById()
        getSavedStudentFunc()
    }, [])

    const getUserById = async () => {
        let finalUserId = ""
        userId.forEach((element) => {
            // filtering the logged in user
            if (element !== user_id) {
                finalUserId = element
            }
        })
        const usersCol = query(collection(db, "Users"), where("id", "==", finalUserId.trim()))
        const usersSnapshot = await getDocs(usersCol)
        const usersList = usersSnapshot.docs.map((doc) => doc.data())
        // after setting details of user and send to getMessages Func
        setItem(usersList)
    }

    // saving students process
    const [loder, setLoder] = useState(false)

    const saveStudents = async (userData) => {
        setLoder(true)
        const data = {
            client_id: parseInt(user_id),
            student_id: parseInt(userData?.id)
        }
        const resp = await saveStudent(data)
        if (resp.status === 200) {
            debugger
            // getSavedStudentFunc is because we have to imediately re render users
            getSavedStudentFunc()
        }
    }

    //  after getting saved students we return an array with names of students and by that array  we are hiding the image below to show the students that are added to favourites
    const [customSavedStd, setcustomSavedStd] = useState([])
    const getSavedStudentFunc = async () => {
        const response1 = await getAllSaveStudents(parseInt(user_id));
        if (response1.status === 200) {
            setcustomSavedStd(savedStdArray(response1?.data?.student))
            // setLoder(false)
        }
    };
    // console.log(customSavedStd)
    // console.log(item[0]?.name)
    //  liftup state is working in getMessages from chatRoom to chatbar
    // console.log(item[0]?.imageUrl)
    return (
        <div className="chatBody" onClick={(e) => getMessages(item[0], roomId, e)}>
            <div className='chatUser'>
                <div>
                        <img className='chatImg' src={item[0]?.imageUrl} alt="" />
                        
                         {/* <img className='chatImg' src="/assets/images/cutomerchatscreen/smileFace.png" alt="" /> */}
                    
                </div>
                <div className='chatUserContent'>
                    <div className='setContentChatUser'>
                        <h5 className='chatUserContentH5'>
                            {item[0]?.name}
                        </h5>
                        <div className='chatUserTimeMain dispFlrxChht'>
                            <span className='chatUserTime'>{finalLastTime}</span> &nbsp; &nbsp;
                            {user_Role === "client" ?
                                customSavedStd?.includes(item[0]?.name) ?
                                    <img src='/assets/images/cutomerchatscreen/goldenChat.svg' alt='' />
                                    :
                                    loder ?
                                        <div className="lds-spinner minorLod">
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
                                        :
                                        <div className='hoverTextDiv hver1'>
                                            <img className='labelImg' src="/assets/images/cutomerchatscreen/chat bookmark.svg" alt="" onClick={() => saveStudents(item[0])} />
                                            <span className="hoverText">Add to favorite students</span>
                                        </div>

                                : ""
                            }
                        </div>
                    </div>
                    <p className='chatUserContentp'>{lastMessage}</p>
                </div>
            </div>
        </div>
    )
})

export default ChatRooms