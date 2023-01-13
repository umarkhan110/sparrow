import axios from "../axios";

export const updateOrder = async (body, order_id) => {
    try {
        // debugger
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('sparrowSignIn'))?.token}` }
        };
        const response = await axios.put(`/orders/${order_id}`, body, config);
        return response;
    } catch (err) {
        return err.response
    }
}