import axios from "../axios";
export const days = async () => {
    try {
      const response = await axios.get("/days" );
      return response;
    } catch (error) {
      return error.response;
    }
  };

  export const timeSlots = async () => {
    try {
      const response = await axios.get("/time-slots" );
      return response;
    } catch (error) {
      return error.response;
    }
  };