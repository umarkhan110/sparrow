import React from 'react'
import ChatBar from './ChatBar'

const StudentChatMain = () => {
    // StudentChatBar is for desktop
    // StudentRespSingle is for mobile
    // we have to add links in both i.e order-page
    return (
        <div className='chatMainFuncton'>
            <div className='chatMainContainer'>
                <ChatBar />
            </div>
        </div>
    )
}

export default StudentChatMain