import axios from "axios";

export default axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + document.cookie.split("=")[1]
    }
});