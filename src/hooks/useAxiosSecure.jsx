import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: 'https://awesome-restaurent-server.vercel.app/'
})

const useAxiosSecure = () => {

  const navigate = useNavigate();
  const { logOut } = useAuth();

  // request interceptors to add authorization header for every secure call to the api
  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token')
    // console.log('request stopped by interceptor', token);

    config.headers.authorization = `Bearer ${token}`
    return config;
  }, function (err) {
    return Promise.reject(err)
  })

  // Response
  axiosSecure.interceptors.response.use(function (response) {
    return response;
  }, async function (err) {
    const status = err.response.status
    // console.log('Status error in the interceptor', status);


    // for 401 or 403 logout the user and move the user to the login
    if (status === 401 || status === 403) {
      await logOut();
      navigate('/login')
    }
    return Promise.reject(err);
  })


  return axiosSecure;
};

export default useAxiosSecure;