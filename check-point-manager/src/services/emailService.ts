import axiosInstance from "../utils/axiosInstance";
import { handleAxiosError } from "../utils/handleAxiosError";




export const EmailService = {

    sendAnEmail: async (name: string,email: string, message: string) => {
        console.log(message)
        try {
            const res = await axiosInstance.post(`/Email`, {
               name,
                 email,
              message
            });
            
            
            console.log("its ok:", res.data);
            return res.data;
        } catch (e: any) {
            if (e.response && e.response.status === 404) {
                alert("המייל לא נשלח");
                return null;
            }
            handleAxiosError(e, "המייל לא נשלח");
            return null;
        }
    }

};
