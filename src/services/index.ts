import axios from "axios";

const BASE_URL = `https://rimac-front-end-challenge.netlify.app/api`
export const getUser = async () => {
    const response = await axios.get(`${BASE_URL}/user.json`);
    return response;
}

export const getPlans = async () => {
    const response = await axios.get(`${BASE_URL}/plans.json`);
    return response;
}

