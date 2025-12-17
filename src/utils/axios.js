import axios from "axios";

export const axiosClient = axios.create({
  // baseURL: "https://mern-project-backend-file.onrender.com",
  // baseURL: "http://localhost:8000",
  baseURL: "https://6942da3dc1067faeeb6bcdd2--employee-management-servicee.netlify.app/",
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem("token")

  }
});

axiosClient.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken'); // Or retrieve from your state management
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

   