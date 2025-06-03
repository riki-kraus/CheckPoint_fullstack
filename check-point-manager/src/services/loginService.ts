import axios from "axios";
import { jwtDecode } from "jwt-decode";

 
// פונקציה להתחברות


interface LoginResponse {
  success: boolean;
  error?: string;
}

export const LoginService = {
  login: async (data: any): Promise<LoginResponse> => {
    console.log("Attempting to login with data:", data);
    try {
      const res = await axios.post("https://localhost:50397/api/Auth", data);

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

// // פונקציה כללית לניהול שגיאות
// export const handleAxiosError = (e: any, defaultMessage: string) => {
//   if (axios.isAxiosError(e) && e.response) {
//     console.log("v")
//     const errorMessage = e.response.data || "שגיאה מהשרת";
//     alert(`${defaultMessage}: ${errorMessage}`);
//   } else {
//     console.log("v")

//     alert(`${defaultMessage}: שגיאה לא ידועה`);
//   }
//   console.error(defaultMessage, e);
// };
