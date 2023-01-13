import axios from "../axios";

export const createTaskAvalability = async (body) => {
    const config = {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('sparrowSignIn'))?.token}` }
    };
    try {
        const response = await axios.post("/tasks-availability", body ,config);
        return response;
    } catch (err) {
        return err.response
    }
}