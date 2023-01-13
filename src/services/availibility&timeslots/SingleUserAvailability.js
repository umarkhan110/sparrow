import axios from "../axios";

export const singleUserAvailability = async (stdID) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('sparrowSignIn'))?.token}` }
        };
        const response = await axios.get(`/student-availability/${stdID}`, config);
        return response;
    } catch (error) {
        return error.response;
    }
};
