import { handleAxiosError } from "../utils/handleAxiosError";
import axiosInstance from "../utils/axiosInstance";

export const StudentSheetService = {

    getStudentEmail: async (firstName: string, lastName: string, className: string) => {
        try {
            const res = await axiosInstance.get(`/Sheet/email`, {
                params: {
                    firstName,
                    lastName,
                    className
                }
            });
            console.log("Email found:", res.data.email);
            return res.data.email;
        } catch (e: any) {
            if (e.response && e.response.status === 404) {
                alert("התלמידה לא נמצאה");
                return null;
            }
            handleAxiosError(e, "שגיאה בשליפת כתובת מייל");
            return null;
        }
    }

};
