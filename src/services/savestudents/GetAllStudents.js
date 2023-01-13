import axios from "../axios";

export const getAllSaveStudents = async (client_id) => {
    try {
        // debugger
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('sparrowSignIn'))?.token}` }
        };
        const response = await axios.get(`/save-student/${client_id}`, config);
        return response;
    } catch (err) {
        return err.response
    }
}