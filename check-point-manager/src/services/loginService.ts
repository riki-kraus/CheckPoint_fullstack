import { jwtDecode } from "jwt-decode";
import axiosInstance from "../utils/axiosInstance";
import axios from "axios";

 
// פונקציה להתחברות


interface LoginResponse {
  success: boolean;
  error?: string;
}

export const LoginService = {
  login: async (data: any): Promise<LoginResponse> => {
    console.log("Attempting to login with data:", data);
    try {
      const res = await axiosInstance.post("/Auth", data);

      const token = res.data.token;
      console.log("Token received:", token);

      const decoded: any = jwtDecode(token);
      const role = decoded["role"] || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      if (role === "Admin") {
        localStorage.setItem("token", token);
        return { success: true };
      } else {
        return { success: false, error: "Unauthorized: Admin access required." };
      }

    } catch (e: any) {
      if (axios.isAxiosError(e) && e.response?.data) {
        return { success: false, error: e.response.data };
      }
      return { success: false, error: "Login failed, please try again." };
    }
  }
};

