import axios from "axios";
import { Submission } from "../Types";

// const API_BASE = "https://localhost:50397/api/DashBoard";
const API_BASE = import.meta.env.VITE_API_URL;

const handleAxiosError = (e: any, defaultMessage: string) => {
  if (axios.isAxiosError(e)) {
    if (e.response) {
      const errorMessage = e.response.data || "שגיאה מהשרת";
      alert(`${defaultMessage}: ${errorMessage}`);
    } else {
      alert(`${defaultMessage}: לא התקבלה תגובה מהשרת`);
    }
  } else {
    alert(`${defaultMessage}: שגיאה לא ידועה`);
  }
  console.error(defaultMessage, e);
};

export const DashBoardService = {
  /**
   * מקבל את ממוצע הכיתה לפי שם כיתה ונושא (אופציונלי)
   * @param className שם הכיתה
   * @param subject נושא (אופציונלי)
   */
  async getClassAverage(className?: string, subject?: string): Promise<number> {
    try {
      const response = await axios.get<number>(`${API_BASE}/DashBoard/class-avg`, {
        params: {
          _class: className,
          sub: subject || null,
        },
      });
      
      return response.data;
    } catch (e) {
      handleAxiosError(e, "שגיאה בשליפת ממוצע כיתה");
      return 0;
    }
  },

  /**
   * מקבל את ממוצע תלמיד לפי מזהה
   * @param studentId מזהה תלמיד
   */
  async getStudentAverage(studentId: number): Promise<number> {
    try {
      const response = await axios.get<number>(`${API_BASE}/DashBoard/${studentId}`);
      return response.data;
    } catch (e) {
      handleAxiosError(e, "שגיאה בשליפת ממוצע תלמיד");
      return 0;
    }
  },
    /**
   * מחזיר את אחוז התלמידים שעברו (ציון >= 60)
   * @param className שם כיתה (אופציונלי)
   * @param subject מקצוע (אופציונלי)
   */
    async getPassRate(className?: string, subject?: string): Promise<number> {
      try {
        const response = await axios.get<number>(`${API_BASE}/DashBoard/pass-rate
`, {
          params: {
            _class: className,
            sub: subject || null,
          },
        });
        return response.data;
      } catch (e) {
        handleAxiosError(e, "שגיאה בשליפת אחוז מעבר");
        return 0;
      }
    },
    /**
   * מחזיר את רשימת ההגשות לפי כיתה ומקצוע (אופציונלי)
   * @param className שם כיתה (אופציונלי)
   * @param subject מקצוע (אופציונלי)
   */
    async getExamsByClassAndSubject(className?: string, subject?: string): Promise<Submission[]> {
      try {
        const response = await axios.get<Submission[]>(`${API_BASE}/DashBoard/exams`, {
          params: {
            _class: className,
            sub: subject || null,
          },
        });
        
        
        return response.data;
      } catch (e) {
        handleAxiosError(e, "שגיאה בשליפת הגשות לפי כיתה ומקצוע");
        return [];
      }
    },
  
};
