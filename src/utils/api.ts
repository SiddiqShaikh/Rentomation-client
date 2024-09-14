import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

// const API_BASE_URL = 'http://localhost:8000/api/v1/'; // LocalURL
const API_BASE_URL = import.meta.env.VITE_LIVE_URL; // LIVEURL

/**
 * Generic function to make API calls
 * @param {string} endpoint - The API endpoint (e.g., '/user/login')
 * @param {string} method - The HTTP method (e.g., 'POST', 'GET', 'PUT', 'DELETE')
 * @param {object} [data] - The data to send with the request (for POST and PUT methods)
 * @param {object} [params] - The query parameters (for GET requests)
 * @param {object} [headers] - The headers to include with the request
 * @returns {Promise} - The axios response promise
 */
const apiCall = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  data: any = null,
  params: any = null,
  headers: Record<string, string> | any = {}
): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url: `${API_BASE_URL}${endpoint}`,
      data,
      params,
      headers,
    };

    const response: AxiosResponse<any> = await axios(config);
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

export default apiCall;