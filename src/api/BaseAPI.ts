"use client"

import axios from 'axios';

const BASE_URL = "http://43.202.207.48:8080";

export const baseFetch = async <T>(
    path: string, 
    options?: {
        headers?: Record<string, string>;
        [key: string]: unknown;
    }
): Promise<T> => {
    const token = localStorage.getItem('token');

    const res = await axios({
        url: `${BASE_URL}${path}`,
        //이거 좀 이상해요ㅜㅜㅜ
        method: (options?.method as import('axios').Method) || 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
            ...(options?.headers || {}),
        },
        ...options,
    });

    return res.data;
}
