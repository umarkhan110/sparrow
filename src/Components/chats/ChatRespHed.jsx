import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
} from "firebase/firestore"
import { firebaseConfig } from '../../firebase/FireBase';


const ChatRespHed = ({userData}) => {
    // this is for only responsive and for showing userName and img
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app)

    const [item, setItem] = useState([])

    useEffect(() => {
        if (userData) {
            getUserById()
        }
    }, [userData])

    const getUserById = async () => {
        // debugger
        const usersCol = query(collection(db, "Users"), where("id", "==", userData))
        const usersSnapshot = await getDocs(usersCol)
        const usersList = usersSnapshot.docs.map((doc) => doc.data())
        setItem(usersList)
    }

    return (
        <div className='chatBody single-chat setResonive1 pb0'>
            <div className='chatUser'>
                <div>
                    <img className='chatImg' src="/assets/images/cutomerchatscreen/smileFace.png" alt="" />
                </div>
                <div className='chatUserContent'>
                    <div className='setContentChatUser'>
                        <h5 className='chatUserContentH5'>{item[0]?.name}</h5>
                        <div className='chatUserTimeMain'>
                            {/* <span className='chatUserTime'>2 hours</span> &nbsp; */}
                            <img className='labelImg' src="/assets/images/cutomerchatscreen/label.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatRespHed