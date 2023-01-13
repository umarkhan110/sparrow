import axios from "../axios";

export const SearchStudent = async (body)=>{
    try{
        // debugger
        
        const response = await axios.post("/search", body);
        return response;
    }catch(err){
        return err.response
    }
}