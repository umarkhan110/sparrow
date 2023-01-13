import axios from "../axios";

export const ShowHomePageFeaturedStudents = async () => {
    try {
        const response = await axios.get(`/featured-students`);
        return response;
    } catch (err) {
        return err.response
    }
}