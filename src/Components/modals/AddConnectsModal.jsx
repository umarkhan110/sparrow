import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import "./modalStyle.css";
import { Modal } from 'react-bootstrap';
// import BankDetailModal from './BankDetailModal';
import { useNavigate } from 'react-router';
// import AuthContext from '../../context/AuthContext';


const AddConnectsModal = ({ show, setShow, taskId }) => {
    // this is connects modal
    // const auth = useContext(AuthContext);

    let navigate = useNavigate();

    const [connects, setConnects] = useState(10)
    const [money, setMoney] = useState(4.99)
    let minusImg = (connects > 10 ? "/assets/images/customerDashboard/minusGreenGroup.svg" : "/assets/images/customerDashboard/minusgroup.svg")
    // decrement
    const decrement = () => {
        if (connects > 10) {
            setConnects(connects - 10)
        } else {
            return false
        }
    }
    // increment
    const increment = () => {
        setConnects(connects + 10)
    }

    useEffect(() => {
        setMoney((connects / 10) * 5)
    }, [connects])



    // closing current Modal
    const handleClose = () => setShow(false);

    // bank detail Modal
    // const [bankShow, setBankShow] = useState(false);
    const openBankModal = () => {
        // debugger
        // auth.connectsToPurchase = connects
        // console.log(auth.connectsToPurchase);
        // here we will add amount to be payed in useParams if OK by beackend otherwise we will change pattern
        setTimeout(() => {
            navigate(`/dashboardRoute/customer-notification/payment/${connects}/${taskId}/1`)
        }, 100);
    }

    return (
        <Modal className='removeDefaultModl' centered show={show} onHide={handleClose}>
            <div className='connectsModalDiv'>
                <p>For inviting more students please buy new connects.</p>
                <p className='addConnctsP'>Add Connects</p>
                <div className='connectM'>
                    <div className='set2ndBox pd010'>
                        <div className='orderfirstBoxP'>
                            <div>
                                <div className='set2ndBox'>
                                    <div>
                                        <span><img onClick={decrement} src={minusImg} alt="" /></span>
                                    </div>
                                    &nbsp;&nbsp;
                                    <h5 className='classicalBtn'>
                                        {connects}
                                    </h5>
                                    &nbsp;&nbsp;
                                    <div>
                                        <span><img onClick={increment} src="/assets/images/customerDashboard/plusgroup.svg" alt="" /></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='set2ndBox'>
                        <div className='orderfirstBoxP'>
                            <div>
                                <h5 className='classicalBtn classicalWidth'>${money}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='modelButtn' onClick={openBankModal}>Buy</button>
            </div>
            {/* <BankDetailModal setBankShow={setBankShow} bankShow={bankShow} /> */}

        </Modal>
    )
}

export default AddConnectsModal