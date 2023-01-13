import axios from "../axios";

export const showStudentDetail = async (user_id) => {
    try {
        // debugger
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('sparrowSignIn')).token}` }
        };
        const response = await axios.get(`/student-details/${user_id}`, config);
        return response;
    } catch (err) {
        return err.response
    }
}