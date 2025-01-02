import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1/"; // LocalURL
// const API_BASE_URL = import.meta.env.VITE_LIVE_URL; // LIVEURL

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
