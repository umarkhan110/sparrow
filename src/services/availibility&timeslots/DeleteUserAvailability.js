import axios from "../axios";

export const DeleteUserAvailability = async (userID)=>{
    try{
        // debugger
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('sparrowSignIn'))?.token}` }
        };
        
        const response = await axios.delete(`/student-availability/${userID}`, config);
        return response;
    }catch(err){
        return err.response
    }
}