import React from 'react'
import './Popup_style.css';
import { useCookies } from 'react-cookie';
  


const Popup = (props) => {
  
    const [cookies, setCookie] = useCookies(['user']);

    const handlePopupAction = (value) => {
      setCookie('userSellData', value, { path: '/', maxAge: 31536000});
    }



  return (
    <div className="popup__popup-box" onClick={props.handleClose}>
      <div className="popup__box">
        <div className="popup__close-icon setResonive" onClick={props.handleClose}>x</div>
        <>
          <div className='popper__mainHeading'>Do not sell my <span className='green'>personal information</span></div>
          <p className='popper__body'>
            The California Consumer Privacy Act (CCPA) provides you with rights regarding how your data or personal information is treated. Under the legislation, California residents can choose to opt-out of the “sale” of their personal information to third parties. Based on the CCPA definition, “sale” refers to data collection for the purpose of creating advertising and other communications. 
            <br /><br/>
            <b>How to opt-out</b><br />
            By clicking the opt-out button below, we will no longer collect or sell your personal information. This applies to both third-parties and the data we collect to help personalize your experience on our website. 
          </p>
          <div className='popper__btnAction pt-3'>
            <button className='popper__accept' onClick={() => handlePopupAction(1)}>Accept</button>
            <button className='popper__out' onClick={() => handlePopupAction(0)}>Opt-out</button>
          </div>
       
        </>
      </div>
    </div>
  )
}

export default Popup