import { Answer } from "../Types";
import axiosInstance from "../utils/axiosInstance";
import { handleAxiosError } from "../utils/handleAxiosError";

// const API_BASE =`${config.apiUrl}/Student`;

export const AnswerService = {
  
    create: async (answer: Partial<Answer>) => {
        try {
            const res = await axiosInstance.post('/Student', answer);
            return res.data;
        } catch (e: any) {
            handleAxiosError(e, "הוספת התשובה נכשלה");
            throw e;
        }
    },
    getByExamId:async(examId:number|undefined)=>
    {
        try {
            const res = await axiosInstance.get(`/examId/${examId}`);
       
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
            const res = await axiosInstance.delete(`/examId/${examId}`)          
            //console.log(res.data)
            alert("התשובה נמחקה בהצלחה");

            return res.data;
        } catch (e: any) {
            handleAxiosError(e, "הבאת התשובות נכשלה");
           // throw e;
        }
    }
    
};

