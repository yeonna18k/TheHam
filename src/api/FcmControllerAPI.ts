"use Client" 

import { baseFetch } from "./BaseAPI"
import axios from "axios";

export async function FcmController(token: string) {
    const response = await axios.post(`${baseFetch}/api/v1/fcm/token`, token);
    return response.data;
}