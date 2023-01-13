import React, { Children, useContext, useEffect, useState } from 'react'
import Routes from './Components/Routes'
import Popup from './popup_body/Popup';
import AuthContext from './context/AuthContext';
import { getLocations } from './services/locations/Locations';
import { useCookies } from 'react-cookie';
import { getAllNotifications } from './services/notifications/GetNotifications';

const App = () => {

  const auth = useContext(AuthContext);
  // console.log(auth)
  const locationsFunc = async () => {
    // debugger
    if (auth.locations.length === 0) {
      const optionlocation = [];
      const resp = await getLocations();
      resp.data?.map(singleLocation => {
        return optionlocation.push({
          'label': singleLocation.city + ' ' + singleLocation.state + ',' + singleLocation.zip,
          'value': singleLocation.id
        })
      })
      // console.log('updateing location')
      auth.addLocations(optionlocation);
    }
  }

  useEffect(() => {
    getFunc();
    locationsFunc();
  }, [])

  // 

  // // get all notifications
  let user_id = (JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id)

  const getFunc = async () => {
    // debugger
    if (JSON.parse(localStorage.getItem('sparrowSignIn'))) {
      const optionNotifications = [];
      const resp = await getAllNotifications(user_id);
      resp.data?.notification?.map(single => {
        return optionNotifications.push(single)
      })
      auth.addNotifications(optionNotifications);
    }
  };

  // console.log("app.js")
  // end
  const [cookies] = useCookies(['userSellData']);
  const [isOpen, setIsOpen] = useState(true);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  // console.log('inside app js chceck render');
  return (
    <>
      {(isOpen && !sessionStorage.getItem("popup_status") && !cookies.userSellData) && <Popup
        content={Children}
        handleClose={togglePopup}
      />}

      <Routes />


    </>
  )
}

export default App