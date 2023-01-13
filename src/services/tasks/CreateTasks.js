import axios from "../axios";

export const createTask = async (body) => {
    
    const config = {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('sparrowSignIn'))?.token}` }
    };
    try {
        const response = await axios.post("/tasks", body ,config);
        return response;
    } catch (err) {
        return err.response
    }
}