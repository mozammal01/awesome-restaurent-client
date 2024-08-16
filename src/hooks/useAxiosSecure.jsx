import axios from "axios";

const axiosSecure = axios.create({
  baseURL: 'http://localhost:4000/'
})

const useAxiosSecure = () => {
  // request interceptors to add authorization header for every secure call to the api
  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token')
    console.log('request stopped by interceptor', token);
    config.headers.authorization = `Bearer ${token}`
    return config;
  }, function (err) {
    return Promise.reject(err)
  })

  // Response
  axiosSecure.interceptors.response.use(function (response) {
    return response;
  }, function (err) {
    const status = err.response.status
    console.log('Status error in the interceptor', status);
    if(status === 401 || status === 403){
      
    }
    return Promise.reject(err);
  })


  return axiosSecure;
};

export default useAxiosSecure;