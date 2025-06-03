import axios from "axios";
import { Submission } from "../Types";

// const API_BASE = `${config.apiUrl}/Submission`;
const API_BASE=`https://localhost:50397/api/Submission`;
//https://localhost:50397/api/Submission

export const SubmissionService = {
 
    getByStudentId: async (StudentId: number) => {
        try {
            const res = await axios.get(`${API_BASE}/StudentId/${StudentId}`);
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
            const res = await axios.post(API_BASE, {StudentId:submission.studentId,ExamId:submission
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
             const res = await axios.get(`${API_BASE}/examIdAndStudentId/${examId}/${studentId}`);
            //https://localhost:50397/api/Submission/examIdAndStudentId/1196/38
            // const res = await axios.get(`https://localhost:50397/api/Submission/examIdAndStudentId/1196/38`);

            console.log("ההגשות נטענו בהצלחה", res.data);
            return res.data;
        } catch (e: any) {
            handleAxiosError(e, "טעינת ההגשות נכשלה");
            throw e;
        }
    }
    
    }


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
