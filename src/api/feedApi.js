import axiosInstance from "./axiosConfig.js";
import {API_URL} from "./config.js";

export const getFeed = () => {
    return axiosInstance.get(API_URL + 'feed/feed');
}
