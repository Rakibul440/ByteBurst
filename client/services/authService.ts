import { api } from "../config/axios"
import { toast } from "sonner"

export const authService = {
    signup: async (payload: Object) => {

        const response = await api.post("auth/signup", payload)
        return response.data

    },

    verifyOtp: async (payload: Object) => {

        const response = await api.post("/auth/verifyOtp", payload)
        return response.data

    },

    login: async (payload: Object) => {


        const response = await api.post("/auth/login", payload)
        return response.data

    },

    updateUserProfile: async (payload: any) => {
        try {
            const response = await api.put("/user/update-profile")
            return response.data
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message);
            console.log(error)
        }
    }

}