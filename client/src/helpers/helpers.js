import axios from 'axios'
import {LOGIN_API, PING_API, SIGN_UP_API, VOCAB_API} from "@/helpers/api";

const handleForbiddenError = fn => (...params) =>
    fn(...params).catch(error => {
        if (error?.status === 403) {
            window.location.href = '/welcome'
        }
        return error
    })

const handleError = fn => (...params) =>
    fn(...params).catch(error => error)

export const api = {
    login : handleError(async payload => {
        const res = await axios.post(LOGIN_API, payload)
        return res.data
    }),
    signUp : handleError(async payload => {
        const res = await axios.post(SIGN_UP_API, payload)
        return res.data
    }),
    authenticate: handleError(async (token) => {
        const response = await axios.get(PING_API, authConfig(token))
        return response.data
    }),
    findAllWords: handleForbiddenError(async (token, page) => {
        const response = await axios.get(`${VOCAB_API}?page=${page}`, authConfig(token))
        return response.data
    }),
    findWordById: handleForbiddenError(async (token, id) => {
        const response = await axios.get(`${VOCAB_API}/${id}`, authConfig(token))
        return response.data
    }),
    updateWord: handleForbiddenError(async (token, id, payload) => {
        const response = await axios.put(`${VOCAB_API}/${id}`, payload, authConfig(token))
        return response.data
    }),
    createWord: handleForbiddenError(async (token, payload) => {
        return await axios.post(`${VOCAB_API}`, payload, authConfig(token))
    }),
    deletedWord: handleForbiddenError(async (token, id) => {
        return await axios.delete(`${VOCAB_API}/${id}`, authConfig(token))
    })
}

const authConfig = token => {
    return {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
}