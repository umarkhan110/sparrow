import axios from "../axios";

export const getAllPrevHiredStudents = async (client_id) => {
    try {
        // debugger
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('sparrowSignIn'))?.token}` }
        };
        const response = await axios.get(`/previous-hires/${client_id}`, config);
        return response;
    } catch (err) {
        return err.response
    }
}