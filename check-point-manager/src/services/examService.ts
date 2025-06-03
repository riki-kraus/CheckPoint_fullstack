import axios from "axios";
import { Exam } from "../Types";

// const API_BASE =`${config.apiUrl}/Student`;
const API_BASE =`https://localhost:50397/api/Exam`;


export const ExamService = {
    getAll: async () => {
        try {
            const res = await axios.get(API_BASE);
            return res.data;
        } catch (e: any) {
            console.error("Error fetching exams:", e);
            throw e;
        } 
    },

    // getById: async (id: number) => {
    //     try {
    //         const res = await axios.get(`${API_BASE}/id/${id}`);
    //         return res.data;
    //     } catch (e: any) {
    //         console.error(`Error fetching student with ID ${id}:`, e);
    //         throw e;
    //     }
    // },

    // getByClass: async (_class: string) => {
    //     try {
    //         const res = await axios.get(`${API_BASE}/class/${_class}`);
    //         return res.data;
    //     } catch (e: any) {
    //         console.error(`Error fetching students from class ${_class}:`, e);
    //         handleAxiosError(e, "כיתה זו לא קיימת");
    //         throw e;
    //     }
        
    // },

    create: async (exam: Partial<Exam>) => {
        console.log(exam)
        try {
            const res = await axios.post(API_BASE, exam);
            alert("המבחן נוסף בהצלחה");
            //console.log(res.data)
            return res.data;
        } catch (e: any) {
            handleAxiosError(e, "הוספת המבחן נכשלה");
            throw e;
        }
    },
   
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
 
 getBySubjectAndDate: async (subject:string,date:string) => {
    try {
        const res = await axios.get(`${API_BASE}/BySubjectAndDate/${subject},${date}`);
        //console.log(res.data)
        return res.data;
    } catch (e: any) {
        handleAxiosError(e, "שליפת המבחן נכשלה");
        throw e;
    }
},

    delete: async (id: number|undefined) => {
        try {
            console.log("------------")

            const res = await axios.delete(`${API_BASE}/${id}`);
            alert("המבחן נמחק בהצלחה");
            return res.data;
        } catch (e: any) {
            console.log("------------")
            handleAxiosError(e, "המחיקה נכשלה");

            throw e;
        }
    }
  
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
