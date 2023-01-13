import axios from "../axios";

export const ShowAllStudents = async (role_id , ClientId) => {
    try {
        const response = await axios.get(`/users/role/${role_id}?client=${ClientId}`);
        return response;
    } catch (err) {
        return err.response
    }
}