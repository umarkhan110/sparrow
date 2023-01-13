import axios from "../axios";

export const getLocations = async () => {
    try {
        // debugger
        const response = await axios.get("/locations/2");
        return response;
    } catch (err) {
        return err.response
    }
}