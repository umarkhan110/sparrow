import axios from "../axios";

export const ForgotPassword = async (body) => {
  
    try {
        // debugger
        const response = await axios.post("/forgot-password", body);
        return response;
    } catch (err) {
        return err.response
    }
}