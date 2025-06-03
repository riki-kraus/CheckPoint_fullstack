import axios from "axios";

// ה־API שלך מחכה ל־GET עם פרמטרים firstName, lastName, className
const API_BASE = "https://localhost:50397/api/Email";


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

export const EmailService = {

    sendAnEmail: async (name: string,email: string, message: string) => {
        console.log(message)
        try {
            const res = await axios.post(`${API_BASE}`, {
               name,
                 email,
              message
            });
            
            
            console.log("its ok:", res.data);
            return res.data;
        } catch (e: any) {
            if (e.response && e.response.status === 404) {
                alert("המייל לא נשלח");
                return null;
            }
            handleAxiosError(e, "המייל לא נשלח");
            return null;
        }
    }

};
