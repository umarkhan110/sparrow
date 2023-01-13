import React, { Component } from 'react'

export default class HappyUsers extends Component {
    render() {
        return (
            <div className='usrBox'>
                <div className='usrBoxContainer'>
                    <div><img className='mt-10' src="/assets/images/home/Group 8795.svg" alt="" /></div>           
                    <div className='usrStars'>
                        <img src="/assets/images/home/Star 5.svg" alt="" />
                        <img src="/assets/images/home/Star 5.svg" alt="" />
                        <img src="/assets/images/home/Star 5.svg" alt="" />
                        <img src="/assets/images/home/Star 5.svg" alt="" />
                        <img src="/assets/images/home/Star 5.svg" alt="" />
                    </div>
                    <p>Peter did an amazing job carrying boxes and loading our truck. A great guy with lots of energy. I never thought it was that easy to get a helping hand</p>
                </div>
                <div className='usrBoxBottom'>
                    <div>
                        <img src="/assets/images/home/glassesMan.png" alt="" />
                    </div>
                    <div className='usrBoxBottomCotent'>
                        <h5 className='usrBoxH'>Michael, Palo Alto</h5>
                        <p>Moving</p>
                    </div>
                </div>
            </div>
        )
    }
}
