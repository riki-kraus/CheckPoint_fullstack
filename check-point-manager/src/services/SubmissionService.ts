import { Submission } from "../Types";
import { handleAxiosError } from "../utils/handleAxiosError";
import axiosInstance from "../utils/axiosInstance";


export const SubmissionService = {
 
    getByStudentId: async (StudentId: number) => {
        try {
            const res = await axiosInstance.get(`/Submission/StudentId/${StudentId}`);
            console.log(res.data);
            return res.data;
        } catch (e: any) {
            console.error(`Error fetching submissions of student: ${StudentId}:`, e);
            handleAxiosError(e, "שגיאה בהבאת המידע של המשתמש");
            throw e;
        }
    },
  
    create: async (submission: Partial<Submission>) => {
        console.log(submission)
        try {
            const res = await axiosInstance.post('/Submission', {StudentId:submission.studentId,ExamId:submission
                .examId,File_Url:submission.fileUrl,File_Url_FeedBack:submission.fileUrlFeedback,Score:submission.score});
            console.log("המשתמש נוסף בהצלחה", res.data);
            return res.data;
        } catch (e: any) {
            handleAxiosError(e, "הוספת המשתמש נכשלה");
            throw e;
        }
    },
    GetByExamIdAndStudentId: async (examId: number, studentId: number):Promise<Submission> => {
        console.log(examId)

        try {
             const res = await axiosInstance.get(`/Submission/examIdAndStudentId/${examId}/${studentId}`);
        
            console.log("ההגשות נטענו בהצלחה", res.data);
            return res.data;
        } catch (e: any) {
            handleAxiosError(e, "טעינת ההגשות נכשלה");
            throw e;
        }
    }
    
    }
