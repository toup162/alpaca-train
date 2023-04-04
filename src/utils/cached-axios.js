import axios from "axios";
import { setupCache } from "axios-cache-adapter";

export const cache = setupCache({
    maxAge: 15 * 1000,
    exclude: {
        query: false,
    }
});

export const axiosInstance = axios.create({
    adapter: cache.adapter
});