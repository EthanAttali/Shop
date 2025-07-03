import axios, { AxiosResponse } from "axios";
import { FormikProps } from "formik";
import { PersonalUserInfo } from "../utils/types";

export const sendWhatsappCode = async () => {    
    const res = await axios.get(`${import.meta.env.VITE_APP_URL_API}api/sms/send-code`)
    return res;
}

export const checkWhatsappCode = async (code: number):Promise<AxiosResponse<any, any>> => {
    return axios.post(`${import.meta.env.VITE_APP_URL_API}api/sms/check-code`, {
        codeClient: code
    })    
}

export const updatePersonalInfos = (formik: FormikProps<PersonalUserInfo>, id: number) => {
    //update infos of user
    const res = axios.put(`${import.meta.env.VITE_APP_URL_API}api/users/update-info`, {
        username: formik.values.username,
        name: formik.values.name,
        email: formik.values.email,
        password: formik.values.password,
        id:id
    })
    return res;
}