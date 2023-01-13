import axios from "../axios";

export const getSingleOrder = async (order_id) => {
    try {
        // debugger
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('sparrowSignIn'))?.token}` }
        };
        const response = await axios.get(`/orders/${order_id}`, config);
        return response;
    } catch (err) {
        return err.response
    }
}