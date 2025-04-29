import axios, { AxiosResponse } from 'axios';
import { FormikProps } from "formik";
import SignInFormValues from '../utils/SignInFormValues';

 export const signInAxios = async (formik: FormikProps<SignInFormValues>):Promise<AxiosResponse<any, any>> => {

    const res = await axios.post(`${import.meta.env.VITE_APP_URL_API}api/auth/login`, {
        username: formik.values.userName,
        // name: formik.values.name,
        // email: formik.values.email,
        password: formik.values.password
    })
    return res;
}