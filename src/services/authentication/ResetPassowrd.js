import axios from "../axios";

export const ResetPassword = async (body) => {
  
    try {
        debugger
        const response = await axios.post("/reset-password", body);
        return response;
    } catch (err) {
        return err.response
    }
}