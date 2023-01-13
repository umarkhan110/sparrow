import axios from "../axios";

export const updateStudentDetail = async (body)=>{
    try{
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('sparrowSignIn'))?.token}` }
        };
        // debugger
        const response = await axios.put(`/student-details/${(JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id)}`, body, config);
        return response;
    }catch(err){
        return err.response
    }
}