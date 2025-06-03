import axios from "axios";
import { Answer } from "../Types";

// const API_BASE =`${config.apiUrl}/Student`;
const API_BASE =`https://localhost:50397/api/Answer`;

export const AnswerService = {
  
    create: async (answer: Partial<Answer>) => {
        try {
            const res = await axios.post(API_BASE, answer);
           // alert("התשובה נוספה בהצלחה");
            //console.log(res.data)
            return res.data;
        } catch (e: any) {
            handleAxiosError(e, "הוספת התשובה נכשלה");
            throw e;
        }
    },
    getByExamId:async(examId:number|undefined)=>
    {
        try {
            const res = await axios.get(`${API_BASE}/examId/${examId}`);
       
            console.log(res.data)
            return res.data;
        } catch (e: any) {
            handleAxiosError(e, "הבאת התשובות נכשלה");
            throw e;
        }
    },
    deleteByExamId:async(examId:number|undefined)=>
    {
        try {
            const res = await axios.delete(`${API_BASE}/examId/${examId}`)          
            //console.log(res.data)
            alert("התשובה נמחקה בהצלחה");

            return res.data;
        } catch (e: any) {
            handleAxiosError(e, "הבאת התשובות נכשלה");
           // throw e;
        }
    }
    // update: async (id: number, student: Partial<Student>) => {
    //     try {
    //         const res = await axios.put(`${API_BASE}/${id}`, student);
    //         alert("הפרטים התעדכנו בהצלחה");
    //         return res.data;
    //     } catch (e: any) {
    //         handleAxiosError(e, "עדכון הפרטים נכשל");
    //         throw e;
    //     }
    // },

    // delete: async (id: number) => {
    //     try {
    //         const res = await axios.delete(`${API_BASE}/${id}`);
    //         alert("המשתמש נמחק בהצלחה");
    //         return res.data;
    //     } catch (e: any) {
    //         handleAxiosError(e, "המחיקה נכשלה");
    //         throw e;
    //     }
    // }
  
};

// פונקציה גלובלית לניהול שגיאות בצורה מסודרת
const handleAxiosError = (e: any, defaultMessage: string) => {
    if (axios.isAxiosError(e) && e.response) {
        const errorMessage = e.response.data || "שגיאה מהשרת";
        alert(`${defaultMessage}: ${errorMessage}`);
    } else {
        alert(`${defaultMessage}: שגיאה לא ידועה`);
    }
    console.error(defaultMessage, e);
};
