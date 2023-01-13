import axios from "../axios";

export const logout = async (body) => {
    // debugger
    try {
        // we are adding token as it is required by backend for security purpose
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('sparrowSignIn'))?.token}` }
        };
        const response = await axios.post("/logout", body, config);
        return response;
    } catch (err) {
        return err.response
    }
}