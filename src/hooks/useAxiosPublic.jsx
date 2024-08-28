import axios from "axios";

const axiosPublic = axios.create({
  baseURL: 'https://awesome-restaurent-server.vercel.app/'
})

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;