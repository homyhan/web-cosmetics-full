import axios from "axios";

const BASE_URL ="http://localhost:8080";
// const BASE_URL ="https://web-cosmetics-full-production.up.railway.app";
export const http = axios.create({
    baseURL: BASE_URL
})