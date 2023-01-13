import axios from "../axios";

export const verificationAccount = async (body, body1) => {
    try {
        // debugger
        // sending bearer token for account verification
        // also body1 is sent in because it is mandatory from backend to sent a structure for verification of email fact:body1 is undfined here
        const config = {
            headers: { Authorization: `Bearer ${body}` }
        };
        const response = await axios.post("/email/verification-notification",body1, config);
        return response;
    } catch (err) {
        return err.response
    }
}