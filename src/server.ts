import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://s14-13-m-java-production.up.railway.app/",
});

export const setClientToken = (token: string) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;

    return config;
  });
};

// Función para eliminar el token al desloguearse
/*export const removeClientToken = () => {
  apiClient.setHeader("Authorization", null);
};*/

export default apiClient;
