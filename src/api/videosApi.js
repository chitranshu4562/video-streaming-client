import axiosInstance from "./axiosConfig.js";
import {API_URL} from "./config.js";

export const uploadVideo = (data) => {
    return axiosInstance.post(API_URL + 'videos/upload-video', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
};

export const performAction = (data) => {
    return axiosInstance.post(API_URL + 'videos/perform-action', data);
};
