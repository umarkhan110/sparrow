import axios from "./services/axios";

const AxiosInterceptorsSetup = navigate => {
    // debugger
    axios.interceptors.response.use(
        response => response,
        error => {
            if (error.response.status === 401) {
                localStorage.removeItem('sparrowSignIn');
                navigate('/signin');
            }
            return Promise.reject(error);
        }
    );
};

export default AxiosInterceptorsSetup;