import axios from "../axios";

export const createUser = async (body)=>{
    try{
        // debugger
        const response = await axios.post("/users", body);
        return response;
    }catch(err){
        return err.response
    }
}