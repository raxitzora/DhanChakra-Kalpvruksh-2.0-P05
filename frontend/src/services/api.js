import { useAuth } from "@clerk/clerk-react";

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useApi = () => {
    const { getToken } = useAuth();

    const fetchWithAuth = async (endpoint, options = {}) => {
        const token = await getToken();
        
        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers
        };

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    };

    return {
        get: (endpoint) => fetchWithAuth(endpoint),
        post: (endpoint, data) => fetchWithAuth(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        }),
        put: (endpoint, data) => fetchWithAuth(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        }),
        del: (endpoint) => fetchWithAuth(endpoint, {
            method: 'DELETE'
        })
    };
};
