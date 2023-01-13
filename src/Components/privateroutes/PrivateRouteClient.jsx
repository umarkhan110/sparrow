import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
function PrivateRouteClient({ children }) {
    //UseState
    const [isExpiredTime, setIsExpiredTime] = useState(true);
    //UseEffect
    useEffect(() => {
        checkExpiryTime();
    }, []);
    //Functions
    const checkExpiryTime = () => {
        // debugger
        if (JSON.parse(localStorage.getItem("sparrowSignIn"))?.user?.role === "client") {
            setIsExpiredTime(true);
        } else {
            setIsExpiredTime(false);
        }
    };
    return isExpiredTime ? children : <Navigate to="/signin" />;
}

export default PrivateRouteClient;