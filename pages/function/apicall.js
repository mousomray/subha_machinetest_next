import axiosInstance from "../api/api";
import { myendpoints } from "../api/endpoints";

// Call Product Api
export const fetchProduct = async () => {
    try {
        const apiurl = myendpoints[0];
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Product Data...", response);
        return response?.data
    } catch (error) {
        console.log("Error Fetching Product Data...", error);
    }
}

// Call Details Api 
export const detailsProduct = async (id) => {
    try {
        const apiurl = `${myendpoints[0]}/${id}`;
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Details Data...", response);
        return response?.data
    } catch (error) {
        console.log("Error Fetching Details Data...", error);
    }
}
