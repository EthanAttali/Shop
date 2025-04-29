import axios, { AxiosResponse } from 'axios';
import { FormikProps } from "formik";
import SignUpFormValues from "../utils/SignUpFormValues";

 export const signUpAxios = async (formik: FormikProps<SignUpFormValues>):Promise<AxiosResponse<any, any>> => {

    const res = await axios.post(`${import.meta.env.VITE_APP_URL_API}api/users`, {
        username: formik.values.userName,
        name: formik.values.name,
        email: formik.values.email,
        password: formik.values.password
    })
    return res;
}