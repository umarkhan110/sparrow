import axios from "../axios";

export const createAvailability = async (body)=>{
    try{
        // debugger
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('sparrowSignIn'))?.token}` }
        };
        const response = await axios.post("/student-availability", body, config);
        return response;
    }catch(err){
        return err.response
    }
}