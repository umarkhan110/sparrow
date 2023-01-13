import axios from "../axios";

export const deleteStudent = async (std_id) => {
    try {
        // debugger
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('sparrowSignIn'))?.token}` }
        };
        const response = await axios.delete(`/save-student/${std_id}`, config);
        return response;
    } catch (err) {
        return err.response
    }
}