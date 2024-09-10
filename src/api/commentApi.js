import {API_URL} from "./config.js";
import axiosInstance from "./axiosConfig.js";

const COMMENT_API_URL = API_URL + "comments/";

export const getComments = () => {
    return axiosInstance.get(COMMENT_API_URL + 'fetch-comments');
};

export const addComment = (data) => {
    return axiosInstance.post(COMMENT_API_URL + 'add-comment', data);
};
