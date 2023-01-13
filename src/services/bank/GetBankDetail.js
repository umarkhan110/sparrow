import axios from "../axios";

export const getBankDetail = async (user_id) => {
    try {
        // debugger
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('sparrowSignIn'))?.token}` }
        };
        const response = await axios.get(`/banks/${user_id}`, config);
        return response;
    } catch (err) {
        return err.response
    }
}