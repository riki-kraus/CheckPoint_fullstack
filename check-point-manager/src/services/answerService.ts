import { Answer } from "../Types";
import axiosInstance from "../utils/axiosInstance";
import { handleAxiosError } from "../utils/handleAxiosError";


export const AnswerService = {
  
    create: async (answer: Partial<Answer>) => {
        try {
            const res = await axiosInstance.post('/Anawer', answer);
            return res.data;
        } catch (e: any) {
            handleAxiosError(e, "הוספת התשובה נכשלה");
            throw e;
        }
    },
    getByExamId:async(examId:number|undefined)=>
    {
        try {
            const res = await axiosInstance.get(`/Anawer/examId/${examId}`);
       
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
            const res = await axiosInstance.delete(`/Anawer/examId/${examId}`)          
            //console.log(res.data)
            alert("התשובה נמחקה בהצלחה");

            return res.data;
        } catch (e: any) {
            handleAxiosError(e, "הבאת התשובות נכשלה");
           // throw e;
        }
    }
    
};

