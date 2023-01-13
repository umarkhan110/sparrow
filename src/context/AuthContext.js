import React from 'react';

// Creating the context object and passing the default values.
const AuthContext = React.createContext({
    locations: [],
    addLocations: array => { },
    clearLocation: () => { },
    notifications: [],
    addNotifications: array => { },
    clearNotifications: () => { },
});

export default AuthContext;