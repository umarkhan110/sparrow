import axios from "../axios";

export const updateBankDetails = async (body) => {
    try {
        // debugger
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('sparrowSignIn')).token}` }
        };
        // adding user id here for update call
        const response = await axios.put(`/banks/${JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id}`, body, config);
        return response;
    } catch (err) {
        return err.response
    }
}