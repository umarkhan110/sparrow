import axios from "../axios";

export const uploadFile = async (body) => {
    try {
        const response = await axios.post("/file-upload", body);
        return response;
    } catch (err) {
        return err.response
    }
}