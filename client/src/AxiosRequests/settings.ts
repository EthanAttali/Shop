import axios, { AxiosResponse } from "axios";

export const sendWhatsappCode = async () => {    
    const res = await axios.get(`${import.meta.env.VITE_APP_URL_API}api/sms/send-code`)
    console.log(res)
    return res;
}

export const checkWhatsappCode = async (code: number):Promise<AxiosResponse<any, any>> => {
    return axios.post(`${import.meta.env.VITE_APP_URL_API}api/sms/check-code`, {
        codeClient: code
    })    
}

export const updatePersonalInfos = () => {
    //update infos of user
}