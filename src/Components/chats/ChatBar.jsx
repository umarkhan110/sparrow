import React, { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import FooterNav from '../mobilefooternav/FooterNav'
import { initializeApp } from 'firebase/app';
import { useDebouncedCallback } from 'use-debounce';

import {
    collection as fireStoreCollectione,
    query as fireStoreQuery,
    where as fireStoreWhere,
    getDocs as fireStoreDocs,
    onSnapshot,
    getFirestore,
    addDoc,
    orderBy,
    Timestamp,
    doc,
    updateDoc,
} from "firebase/firestore"

import { firebaseConfig } from '../../firebase/FireBase';
import ChatRooms from './ChatRooms';
import ChatRespHed from './ChatRespHed';
import moment from 'moment';
import { days } from '../../services/availibility&timeslots/Availibility';

const StudentChatBar = () => {
    // 

    // get working days
    const getDaysFunc = async () => {
        const response = await days();
        // if (response.status === 200) {
        //     setworkdays(response?.data);
        // }
    };
    useEffect(() => {
        getDaysFunc();
    }, [])

    // Two components for chat : ChatBar and ChatRooms
    const [loder, setLoder] = useState(true)
    const [loder2, setLoder2] = useState(false)
    // const [activeUser, setActiveUser] = useState(true);
    const [senderId, setSenderId] = useState()

    // chat starts from here
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app)

    let user_id = (JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.id.toString();
    // let image = (JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.image;
    let user_Role = (JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.role;
    let user_Name = (JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.first_name;

    const [chatRooms, setChatRooms] = useState([])
    const [roomId, setRoomId] = useState("")
    const [users, setUsers] = useState([])
    const [countUsers, setCountUsers] = useState(0)
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("")


    //1. setting list of users
    useEffect(() => {
        if (countUsers === 0) {
            getUsers(db)
            // getMessages(db);
            setCountUsers(1)
        }
    }, [countUsers])


    // checking in ChatRooms which have mentioned user_Id
    async function getUsers(db) {
        const roomsCol = fireStoreQuery(fireStoreCollectione(db, "ChatRooms"), fireStoreWhere("userIds", "array-contains", user_id))
        const roomsSnapshot = await fireStoreDocs(roomsCol)
        const roomsList = roomsSnapshot.docs.map((doc) => doc.data())
        setChatRooms(roomsList)
        setLoder(false)
    }

    //4. showing All Messages in chat on Click of userList and then 5. || chatClass is used for responsive purpose 

    const [chatClass, setChatClass] = useState("chatBar");

    const getMessages = (data, roomID, e) => {
        // debugger
        getMessagesData(db)
        setRoomId(roomID)
        setSenderId(data?.id)
        // adding respChat for responsive purpose
        setChatClass('chatBar RespChat')
        // adding active class
        document.querySelectorAll(".chatBody").forEach((item) => {
            if (e.target.closest(".chatBody") === item) {
                item.classList.add('chatBodyActive');
            } else {
                item.classList.remove('chatBodyActive');
            }
        })

        // getting messages
        async function getMessagesData(db) {
            // Getting messages which have coming roomID from 3. In thenpm st Messages Collection on firebase
            const messagesCol = fireStoreQuery(fireStoreCollectione(db, "Messages"), fireStoreWhere("roomId", "==", roomID), orderBy("timeStamp", "asc"))

            const messagesSnapshot = await fireStoreDocs(messagesCol)
            const messagesList = messagesSnapshot.docs.map((doc) => doc?.data())
            // debugger
            let finalMessageList = messagesList.map((item) => {
                // create Date object
                return {
                    senderId: item?.senderId,
                    roomId: item?.roomId,
                    timeStamp: moment.unix(item?.timeStamp / 1000).format("LT"),
                    message: item?.message,
                    url: item?.url
                }
            })
            // arrangment of messages
            let sortedDates = finalMessageList.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return b.timeStamp > a.timeStamp;
            });
            setMessages(sortedDates);
            // setUserTime(sortedDates[sortedDates.length - 1].timeStamp)
            setUsers(data)
        }
    }


    // 5. instantly showing message in chatBar as the user send or recieve messages

    useEffect(() => {
        if (roomId !== "") {
            const q = fireStoreQuery(fireStoreCollectione(db, "Messages"), fireStoreWhere("roomId", "==", roomId), orderBy("timeStamp", "asc"))

            const unsubscribe = onSnapshot(q, (querySnapshot) => {

                const messaages = []
                querySnapshot.forEach((doc) => {
                    messaages.push({
                        message: doc.data().message,
                        roomId: doc.data().roomId,
                        senderId: doc.data().senderId,
                        timeStamp: moment.unix(doc.data().timeStamp / 1000).format("LT"),
                        url: doc.data().url
                    })
                })
                let sortedDates = messaages.sort(function (a, b) {
                    // Turn your strings into dates, and then subtract them
                    // to get a value that is either negative, positive, or zero.
                    return b.timeStamp > a.timeStamp;
                });
                setMessages(sortedDates);
                // console.log(sortedDates[sortedDates.length - 1].message)
                // calling getUsers function to instantly update last msg and time
                getUsers(db)
            })
        }
    }, [db, roomId])

    // send message to db || formating time
    const serverTime = Timestamp.now();

    async function saveMessage(e) {
        e.preventDefault()
        if (message !== "") {
            try {
                await addDoc(fireStoreCollectione(db, 'Messages'), {
                    message: message,
                    roomId: roomId,
                    senderId: user_id,
                    timeStamp: JSON.stringify(serverTime.seconds * 1000),
                    url: ""
                });
                // setting room here so we can send last msg to db || setting serverTime and message here because we have to show what was the last time and message when we chatted
                const q = fireStoreQuery(fireStoreCollectione(db, "ChatRooms"), fireStoreWhere("id", "==", roomId))
                const roomsSnapshot = await fireStoreDocs(q)
                const roomsListId = roomsSnapshot.docs.map((doc) => doc.id)
                const roomListIdString = roomsListId.toString()

                await updateDoc(doc(db, "ChatRooms", roomListIdString), {
                    lastmessage: message,
                    timeStampOfLastMessage: JSON.stringify(serverTime.seconds * 1000)
                });
                // empty input field
                setMessage("")
                // calling getUsers function to instantly update last msg and time
                getUsers(db)
            }
            catch (error) {
                // console.error('Error writing new message to Firebase Database', error);
            }
        } else {
            return false
        }
    }


    // keeping the chat at the bottom
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView()
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    // Searching & Filtering

    function isTrue(arr, arr2) {
        return arr.every(i => arr2.includes(i));
    }
    // console.log(chatRooms)

    const debounced = useDebouncedCallback(
        async function (e) {
            // setting message list empty onChange
            setMessages([])
            // starts filtering
            let finalUsers = [];

            if (e.target.value) {
                setLoder(true)

                const roomsCol = fireStoreQuery(fireStoreCollectione(db, "ChatRooms"), fireStoreWhere("userIds", "array-contains", user_id))
                const roomsSnapshot = await fireStoreDocs(roomsCol)
                const roomsList = roomsSnapshot.docs.map((doc) => doc.data())
                roomsList.forEach(item => {
                    item.userIds.forEach(item => {
                        if (user_id !== item) finalUsers.push(item)
                    })
                })

                const finalChatRooms = [];

                const FilteredChatRooms = finalUsers.map(async user => {

                    const usersCol = fireStoreQuery(fireStoreCollectione(db, "Users"), fireStoreWhere("id", "==", user))
                    const usersSnapshot = await fireStoreDocs(usersCol)
                    const usersList = usersSnapshot.docs.map((doc) => doc.data());

                    if (usersList[0]?.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
                        const rooms1Col = fireStoreQuery(fireStoreCollectione(db, "ChatRooms"), fireStoreWhere("userIds", "array-contains", usersList[0].id))
                        const rooms1Snapshot = await fireStoreDocs(rooms1Col)
                        const rooms1List = rooms1Snapshot.docs.map((doc) => doc.data())
                        rooms1List.forEach(item => {
                            if (isTrue(item.userIds, [usersList[0].id, user_id])) {
                                finalChatRooms.push(item)
                            }
                        })
                    }
                })

                await Promise.all(FilteredChatRooms)

                setLoder(false)
                setChatRooms(finalChatRooms)
            } else if (e.target.value === "") {

                setLoder(true)
                const roomsCol = fireStoreQuery(fireStoreCollectione(db, "ChatRooms"), fireStoreWhere("userIds", "array-contains", user_id))
                const roomsSnapshot = await fireStoreDocs(roomsCol)
                const roomsList = roomsSnapshot.docs.map((doc) => doc.data())
                setChatRooms(roomsList)
                setLoder(false)
            }
        }, 1500
    );

    // responsive functionality removing for showing and removing classes and getting respitem from chatroom here to show single user data for name and image in responsive

    const handleClick = () => {
        setChatClass('chatBar')
    };



    return (
        <div>
            {/*- In chatClass we are adding another class for which we are making responsive
            - setResonive1 class will displayed block on mobile and none on desktop */}
            <div className={chatClass}>
                <Row>
                    <Col md={4} className="borderRight">
                        <div className='chatMain'>
                            {/* this one is for desktop */}
                            <div className='chatHed setResonive adjustChatHed'>
                                <input
                                    className='filterInput'
                                    type="text"
                                    placeholder={user_Role === "client" ?
                                        "Search Student" : "Search Client"}
                                    onChange={(e) => debounced(e)}
                                />
                                <div>
                                    <img className='chatSearch' src="/assets/images/cutomerchatscreen/Searchvector.svg" alt="" />
                                </div>
                            </div>
                            {/* this one is for responsive */}
                            <div className='ChatResonive1NamesMain setResonive1'>
                                <h2>Chat</h2>
                                <div className="customSearchField flex2 chatSrch">
                                    <input
                                        type="text"
                                        className='findTasksField'
                                        placeholder={user_Role === "client" ?
                                            "Search Student" : "Search Client"}
                                        onChange={(e) => debounced(e)}
                                    // onKeyDown={handleKeyDown}
                                    />
                                    <button className="taskbutton primary center" >SMS</button>
                                </div>
                            </div>
                            {/* 2. Chatroom work */}
                            {
                                loder ?
                                    <div className="height100vh">
                                        <div className="lds-spinner chotaLoder">
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
                                    <div className='adjustingHeight'>
                                        {chatRooms?.map((item) => {
                                            return (
                                                < ChatRooms
                                                    userId={item?.userIds}
                                                    getMessages={getMessages}
                                                    roomId={item?.id}
                                                    userTime={item?.timeStampOfLastMessage}
                                                    lastMessage={item?.lastmessage}
                                                    lastTime={item?.timeStampOfLastMessage}
                                                />
                                            )
                                        })}
                                    </div>
                            }
                        </div>
                    </Col>
                    <Col md={8} className="setResonive">
                        {/* setResonive1 means block in mobile || exporting chatRooms again only for responsive as user will click on the person to chat so on top image,name will be shown of that person || .chatBar.RespChat .setResonive.col-md-8  and .chatBar.RespChat .borderRight.col-md-4 for previous css we are adding RespChat class*/}
                        <div className='singleChathed setResonive1 pb0'>
                            <Link to="" onClick={handleClick}><img src="/assets/images/backArrw.png" alt="" /></Link>
                            <span>Chat</span>
                        </div>
                        <ChatRespHed userData={senderId} />
                        {/*setResonive means block on desktop and none on responsive  */}
                        <div className='chatHed setResonive'>
                            <h5>Chat</h5>
                        </div>
                        <div className='adjustingHeight2'>
                            {loder2 ?
                                <div className="height100vh">
                                    <div className="lds-spinner chotaLoder">
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
                                messages?.map(msg => {
                                    return (
                                        <div>
                                            {msg?.senderId === user_id ?
                                                <div className='floatRightContent'>
                                                    <div className='rContentDiv'>
                                                        <div>
                                                            <p className='rContentHed'>{user_Name}</p>
                                                            <p className='rContentP'>
                                                                {msg?.timeStamp}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <img src="/assets/images/cutomerchatscreen/suserImg.png" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className='typedMsgs'>
                                                        {/* {msg?.url ?
                                                            <p className='notifiP'>Notification Sent</p>
                                                            : */}
                                                        <p className='typedMsgsP text-break'>
                                                            {msg?.message}
                                                        </p>
                                                        {/* } */}
                                                    </div>
                                                </div>
                                                :
                                                <div className='floatleftContent'>
                                                    {/* 2nd User Messages */}
                                                    <div className='lContentDiv'>
                                                        <div>
                                                            <img src="/assets/images/cutomerchatscreen/suserImg.png" alt="" />
                                                        </div>
                                                        <div>
                                                            <p className='rContentHed'>{users?.name}</p>
                                                            <p className='rContentP'>
                                                                {msg?.timeStamp}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='rTypedMsgs'>
                                                        {msg?.url ?
                                                            <Link
                                                                className='typedMsgsP text-break notifiP' to={msg.url}>
                                                                {msg?.message}
                                                            </Link>
                                                            :
                                                            <p className='typedMsgsP text-break'>
                                                                {msg?.message}
                                                            </p>
                                                        }
                                                    </div>
                                                </div>
                                            }
                                            <div ref={messagesEndRef} />
                                        </div>
                                    )
                                }
                                )
                            }
                        </div>

                        <form onSubmit={saveMessage} className='writeMessages'>
                            <div className='writeMessages1stdiv'>
                                <input
                                    value={message}
                                    className='inputMsgField'
                                    placeholder='Message'
                                    type="text"
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                            <div className='elementCenter'>
                                <button className='primary sendMsgBtn' type='submit'>
                                    Send
                                </button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </div>
            <div>
                <FooterNav />
            </div>
        </div>
    )
}

export default StudentChatBar