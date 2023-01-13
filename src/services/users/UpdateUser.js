import axios from "../axios";

export const updateUser = async (body)=>{
    try{
        // debugger
        const response = await axios.put(`/users/${(JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id)}`, body);
        return response;
    }catch(err){
        return err.response
    }
}