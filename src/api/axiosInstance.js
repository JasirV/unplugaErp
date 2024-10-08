import axios from "axios"
const baseURL="//5.189.180.8:8010/"
console.log(baseURL);

const api = axios.create({
    baseURL
});
api.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });


api.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  export default api