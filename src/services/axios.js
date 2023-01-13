import axios from "axios";

// guestAxios used only in login component 
export const guestAxios = axios.create({
  baseURL: "https://backend.spaarrow.com/api",
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

// instance used allover the site as baseUrl 
const instance = axios.create({
  baseURL: "https://backend.spaarrow.com/api",
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});


export default instance;