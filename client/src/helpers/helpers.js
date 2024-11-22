import axios from 'axios'
import {LOGIN_API, PING_API, SIGN_UP_API} from "@/helpers/api";

const handleError = fn => (...params) =>
    fn(...params).catch(error => console.error(error))

export const api = {
    login : handleError(async payload => {
        try {
            const res = await axios.post(LOGIN_API, payload)
            return res.data
        } catch (error) {
            return error
        }
    }),
    signUp : handleError(async payload => {
        try {
            const res = await axios.post(SIGN_UP_API, payload)
            return res.data
        } catch (error) {
            return error
        }
    }),
    authenticate: handleError(async (token) => {
        try {
            const response = await axios.get(PING_API, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return error.status
        }
    })

}