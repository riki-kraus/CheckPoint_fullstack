import axios from "axios";

// ה־API שלך מחכה ל־GET עם פרמטרים firstName, lastName, className
const API_BASE = `https://localhost:50397/api/Students`;

// פונקציה גלובלית לניהול שגיאות בצורה מסודרת
const handleAxiosError = (e: any, defaultMessage: string) => {
    if (axios.isAxiosError(e)) {
        if (e.response) {
            const errorMessage = e.response.data || "שגיאה מהשרת";
            alert(`${defaultMessage}: ${errorMessage}`);
        } else {
            alert(`${defaultMessage}: לא הייתה תגובה מהשרת`);
        }
    } else {
        alert(`${defaultMessage}: שגיאה לא ידועה`);
    }
    console.error(defaultMessage, e);
};

export const StudentSheetService = {

    getStudentEmail: async (firstName: string, lastName: string, className: string) => {
        try {
            const res = await axios.get(`${API_BASE}/email`, {
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
