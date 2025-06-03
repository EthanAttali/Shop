import axios, { AxiosResponse } from "axios";
import { CATEGORIES } from "../utils/types";

export const getProducts = async (category: CATEGORIES):Promise<AxiosResponse<any, any>> => {

    const url = `${import.meta.env.VITE_APP_URL_API}api/products${category != CATEGORIES.ALL ? `?category=${category}`: ''}`
    const res = await axios.get(url)
    return res;
}