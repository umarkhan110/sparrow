import { useReducer } from 'react';
import AuthContext from './AuthContext';


const defaultlocationState = {
    location: [],
};

// 
const defaultNotifcationState = {
    notifications: [],
};
// end

const locationReduser = (state, action) => {
    // debugger
    if (action.type === 'ADD_Location') {
        let updatedItems = action.item;
        return { location: updatedItems, }

    }

    if (action.type === 'CLEAR') {
        return defaultlocationState;
    }

    return defaultlocationState;
}
//  REDUCERS are here
const notificationReduser = (state, action) => {
    if (action.type === "ADD_Notification") {
        let updatedItems = action.item;
        return { notifications: updatedItems, }
    }
    // debugger
    if (action.type === 'CLEAR') {
        // console.log("idr ata");
        return defaultNotifcationState;
    }
    return defaultNotifcationState;
}
// end

const LocationProvider = props => {

    const [locationState, dispatchLocationAction] = useReducer(locationReduser, defaultlocationState);


    const addItemToLocationHandler = item => {
        dispatchLocationAction({ type: 'ADD_Location', item: item });
    };

    const clearItemFromLocationHandler = () => {
        dispatchLocationAction({ type: 'CLEAR' })
    };

    // 
    const [notificationState, dispatchNotificationAction] = useReducer(notificationReduser, defaultNotifcationState);

    const addNotificatonHandler = (item) => {
        dispatchNotificationAction({ type: 'ADD_Notification', item: item })
    };
    const clearNotificatonHandler = () => {
        // debugger
        dispatchNotificationAction({ type: 'CLEAR' })
    };

    // end

    const locationContext = {
        locations: locationState.location,
        addLocations: addItemToLocationHandler,
        clearLocation: clearItemFromLocationHandler,
        notifications: notificationState.notifications,
        addNotifications: addNotificatonHandler,
        clearNotifications: clearNotificatonHandler
    };
    return <AuthContext.Provider value={locationContext}>
        {props.children}
    </AuthContext.Provider>
};

export default LocationProvider;