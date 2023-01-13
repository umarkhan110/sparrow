import axios from "../axios";

export const getSingleTask = async (student_id) => {
    try {
        // debugger
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('sparrowSignIn'))?.token}` }
        };
        const response = await axios.get(`/tasks/${student_id}`, config);
        return response;
    } catch (err) {
        return err.response
    }
}