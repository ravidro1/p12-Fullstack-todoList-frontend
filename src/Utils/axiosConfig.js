import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.withCredentials = true;

let refresh = false;

axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    // console.log(refresh);
    // if (!error.response.status)
    //   return Promise.reject({
    //     response: {
    //       status: 520,
    //     },
    //   });
    if (error.response.status == 401 && !refresh) {
      refresh = true;
      const response = await axios.post("/api/user/refresh-token");

      if (response.status == 200) return axios(error.config);
    }
    refresh = false;

    return Promise.reject(error);
    // return error;
  }
);
