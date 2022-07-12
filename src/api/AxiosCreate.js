import axios from 'axios';

const apiClient = axios.create({
    headers: {
        "Content-Type": 'application/json'
    },
    baseURL: process.env.REACT_APP_SERVER_HOST_DEV
});

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };