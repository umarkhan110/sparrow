import { guestAxios } from "../axios";

export const login = async (body) => {
    try {
        // debugger
        const response = await guestAxios.post("/login", body);
        return response;
    } catch (err) {
        return err.response
    }
}