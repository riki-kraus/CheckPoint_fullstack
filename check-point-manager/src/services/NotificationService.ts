import { handleAxiosError } from "../utils/handleAxiosError";
import axiosInstance from "../utils/axiosInstance";
import { NotificationAdmin } from "../Types";

export const NotificationService = {
    getAll: async () => {
        try {
            const res = await axiosInstance.get('/Notification');
            return res.data;
        } catch (e: any) {
            console.error("Error fetching exams:", e);
            throw e;
        } 
    },

    create: async (notification:NotificationAdmin) => {
      console.log("Creating notification:", notification);
        try {
          const res = await axiosInstance.post('/Notification', notification);
          return res.data;
        } catch (e: any) {
          handleAxiosError(e, "הוספת ההודעה נכשלה");
        }
      }
    
};
