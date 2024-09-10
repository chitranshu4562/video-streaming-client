import axiosInstance from "./axiosConfig.js";
import {API_URL} from "./config.js";
const VIDEO_API_URL = `${API_URL}videos/`

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

export const fetchVideoById = (videoId) => {
    return axiosInstance.get(VIDEO_API_URL + 'fetch-video', {
        params: {
            videoId
        }
    })
};
