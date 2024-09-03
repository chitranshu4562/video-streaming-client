import {API_URL} from "./config.js";
import axiosInstance from "./axiosConfig.js";

export const getUsers = (searchTerm = '', userId = '') => {
    return axiosInstance.get(API_URL + 'users/get-users', {
        params: {
            searchTerm, userId
        }
    })
}
