import axios from "axios";

const instance = new axios.create({
    baseURL: "http://192.168.33.35:1000"
});

export default instance;