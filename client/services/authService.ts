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

    updateUserProfile: async (payload: Object) => {

        const response = await api.patch("/user/update-profile", payload)
        return response.data

    }

}