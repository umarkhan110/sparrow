import axios from "../axios";

export const createPayment = async (body) => {
    try {
        // debugger
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('sparrowSignIn'))?.token}` }
        };
        const response = await axios.post("/payment", body, config);
        return response;
    } catch (err) {
        return err.response
    }
}