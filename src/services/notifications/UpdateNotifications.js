import axios from "../axios";

export const updateNotification = async (notification_id, body) => {
    try {
        // debugger
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('sparrowSignIn'))?.token}` }
        };
        const response = await axios.put(`/notification/${notification_id}`, body, config);
        return response;
    } catch (err) {
        return err.response
    }
}