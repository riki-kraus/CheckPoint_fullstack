import axios from "axios";
import { Student } from "../Types";
// import { Student } from "../Types";

// const API_BASE =`${config.apiUrl}/Student`;
const API_BASE = `https://localhost:50397/api/Student`;

export const StudentService = {
    // let   filteredClass: string = ""; // משתנה לאחסון הכיתה המסוננת

    getAll: async () => {

        try {
            const res = await axios.get(API_BASE);
        // console.log("students", res.data);

            return res.data;
        } catch (e: any) {
            console.error("Error fetching students:", e);
            throw e;
        }
        
    },

    getById: async (id: number) => {
        try {
            const res = await axios.get(`${API_BASE}/id/${id}`);
            return res.data;
        } catch (e: any) {
            console.error(`Error fetching student with ID ${id}:`, e);
            //
            throw e;
        }
    },

    getByClass: async (_class: string) => {
        try {
            const res = await axios.get(`${API_BASE}/class/${_class}`);
            return res.data;
        } catch (e: any) {
            console.error(`Error fetching students from class ${_class}:`, e);
            handleAxiosError(e, "כיתה זו לא קיימת");
            throw e;
        }

    },
    getByFullNameAndClass: async (ClassName: string, FirstName: string, LastName: string) => {
        console.log(ClassName)
        console.log(FirstName)

        console.log(LastName)
        // FirstName="ריקי"
        // LastName="תת"
        // ClassName="ה3"

        try {
            const res = await axios.get(`${API_BASE}/byFullName`, {
                params: {
                    FirstName,
                    LastName,
                    ClassName // שים לב לשינוי כאן
                }
            });
            console.log("ה גדול")
            return res.data;
        } catch (e: any) {
            console.error(`Error fetching student ${FirstName} ${LastName} from class ${ClassName}:`, e);
            handleAxiosError(e, "תלמיד זה לא קיים בכיתה זו");
            throw e;
        }
    },

    create: async (student: Partial<Student>) => {
        try {
            const res = await axios.post(API_BASE, student);
            alert("המשתמש נוסף בהצלחה");
            return res.data;
        } catch (e: any) {
            handleAxiosError(e, "הוספת המשתמש נכשלה");
            throw e;
        }
    },

    update: async (id: number, student: Partial<Student>) => {
        try {
            const res = await axios.put(`${API_BASE}/${id}`, student);
            alert("הפרטים התעדכנו בהצלחה");
            return res.data;
        } catch (e: any) {
            handleAxiosError(e, "עדכון הפרטים נכשל");
            throw e;
        }
    },

    delete: async (id: number) => {
        try {
            const res = await axios.delete(`${API_BASE}/${id}`);
            alert("המשתמש נמחק בהצלחה");
            return res.data;
        } catch (e: any) {
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
