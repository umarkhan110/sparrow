import axios from "../axios";

export const updatePurchaseInvities = async (id, body) => {
    try {
        // debugger
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('sparrowSignIn'))?.token}` }
        };
        const response = await axios.put(`/tasks-available-invites/${id}`, body, config);
        return response;
    } catch (err) {
        return err.response
    }
}