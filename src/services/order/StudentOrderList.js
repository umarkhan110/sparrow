import axios from "../axios";

export const getStudentOrders = async (std_id) => {
    try {
        // debugger
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('sparrowSignIn'))?.token}` }
        };
        const response = await axios.get(`/student-orders/${std_id}`, config);
        // const response = await axios.get(`/student-orders/${std_id}`);

        return response;
    } catch (err) {
        return err.response
    }
}