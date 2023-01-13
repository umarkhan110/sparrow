import axios from "../axios";

export const createBankDetails = async (body)=>{
    try{
        // debugger
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('sparrowSignIn')).token}` }
        };
        const response = await axios.post("/banks", body, config);
        return response;
    }catch(err){
        return err.response
    }
}