import { Exam } from "../Types";
import { handleAxiosError } from "../utils/handleAxiosError";
import axiosInstance from "../utils/axiosInstance";

export const ExamService = {
    getAll: async () => {
        try {
            const res = await axiosInstance.get('/Exam');
            return res.data;
        } catch (e: any) {
            console.error("Error fetching exams:", e);
            throw e;
        } 
    },

    create: async (exam: Partial<Exam>) => {
        console.log(exam)
        try {
            const res = await axiosInstance.post('/Exam', exam);
            alert("המבחן נוסף בהצלחה");
            return res.data;
        } catch (e: any) {
            handleAxiosError(e, "הוספת המבחן נכשלה");
            throw e;
        }
    },

 getBySubjectAndDate: async (subject:string,date:string) => {
    try {
        const res = await axiosInstance.get(`/Exam/BySubjectAndDate/${subject},${date}`);
        return res.data;
    } catch (e: any) {
        handleAxiosError(e, "שליפת המבחן נכשלה");
        throw e;
    }
},

    delete: async (id: number|undefined) => {
        try {
            const res = await axiosInstance.delete(`/Exam/${id}`);
            alert("המבחן נמחק בהצלחה");
            return res.data;
        } catch (e: any) {
            handleAxiosError(e, "המחיקה נכשלה");
            throw e;
        }
    }
  
};
