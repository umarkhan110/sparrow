import { initializeApp } from 'firebase/app';
import { addDoc, collection, getDocs, query, where, Timestamp, getFirestore, updateDoc, doc } from 'firebase/firestore'
import { firebaseConfig } from '../../../firebase/FireBase';
import { v4 as uuidv4 } from 'uuid';

export const createChatRoom = async (studentId, clientId, taskId, orderId) => {
    // this whole function is for creating chatRooms and is using in inviteStudent + customerCreateTask screen
    // firebase
    const appNew = initializeApp(firebaseConfig);
    const dbNew = getFirestore(appNew);

    let user_name = (JSON.parse(localStorage.getItem('sparrowSignIn')))?.user?.first_name;

    // chatRoom/firebase is creating from here for pushing notification of order in Chat || below is for checking if already their exist a ChatRoom b/w users or not

    const q = query(collection(dbNew, "ChatRooms"), where("userIds", "array-contains-any", [clientId]))

    const roomsSnapshot2 = await getDocs(q);
    const roomsList2 = roomsSnapshot2.docs.map((doc) => doc.data());

    const roomLIstGet2 = roomsList2.filter((item) => {
        return item.userIds.includes(studentId);
    });

    if (roomLIstGet2.length === 0) {
        // creating firestore date
        const date = Timestamp.now();
        // sending to firestore db
        await addDoc(collection(dbNew, "ChatRooms"), {
            id: uuidv4(),
            lastmessage: '',
            lastmessages: '',
            timeStampOfLastMessage: date,
            userIds: [
                clientId,
                studentId
            ]
        });
        // console.log('room created')
    }
    // searching for rooms to which we have to send notification in Msg

    const qChatRooms = query(collection(dbNew, "ChatRooms"), where('userIds', '==', [clientId, studentId]));
    const qRoomsSnapshot = await getDocs(qChatRooms)
    const qRoomsList = qRoomsSnapshot.docs.map((doc) => doc.data())
    const qRoomdId = qRoomsList.map((item) => {
        return item?.id
    })

    // sending msg to student
    const serverTime = Timestamp.now();

    await addDoc(collection(dbNew, 'Messages'), {
        message: `${user_name} sent a job offer. Click to View Offer`,
        roomId: qRoomdId.toString(),
        senderId: clientId,
        timeStamp: JSON.stringify(serverTime.seconds * 1000),
        url: `/dashboardRoute/chatStudent/student-task-descp/${taskId}/${orderId}`
    });

    // setting room here so we can send last msg to db || setting serverTime and message here because we have to show what was the last time and message when we chatted

    const q2 = query(collection(dbNew, "ChatRooms"), where("id", "==", qRoomdId.toString()))
    const roomsSnapshot = await getDocs(q2)
    const roomsListId = roomsSnapshot.docs.map((doc) => doc.id)
    const roomListIdString = roomsListId.toString()

    await updateDoc(doc(dbNew, "ChatRooms", roomListIdString), {
        lastmessage: `${user_name} sent a job offer. Click to View Offer`,
        timeStampOfLastMessage: JSON.stringify(serverTime.seconds * 1000)
    });

}