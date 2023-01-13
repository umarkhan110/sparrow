import axios from "../axios";

export const getLocations = async () => {
    try {
        // debugger
        const response = await axios.get("/locations");
        return response;
    } catch (err) {
        return err.response
    }
}