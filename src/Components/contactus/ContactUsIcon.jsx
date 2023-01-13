import React from 'react'
// import { Link } from 'react-router-dom';

function ContactUsIcon() {

    // function contactclick() {
    //     if (document.querySelector(".click-display-active")) {
    //         const z = document.querySelector("#click_icon");
    //         z.classList.remove("click-display-active");
    //     } else {
    //         const z = document.querySelector("#click_icon");
    //         z.classList.add("click-display-active");
    //     }
    // }

    return (


        <div className='click-contact'>

            <div className='img-mb-click1'>
                <a href='https://wa.me/4528962704'>
                    <img className='img-click-1' src="/assets/images/conatcus/chatIMg.svg" alt="" />
                </a>
            </div>

            {/* <div className="click-display" id='click_icon'>
                <div className='img-mb-click2'>
                    <Link to="/signInRoute/contact-us"> <img src="/assets/images/conatcus/whatsapp.svg" alt="" /> </Link>
                </div>

                <div className='img-mb-click3'>
                    <Link to="/signInRoute/contact-us">   <img src="/assets/images/conatcus/mail.svg" alt="" /> </Link>
                </div>
            </div> */}

        </div>



    )
}

export default ContactUsIcon