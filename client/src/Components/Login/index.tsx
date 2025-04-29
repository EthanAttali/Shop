import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { FormikProps, useFormik } from 'formik';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SignInFormValues from '../../utils/SignInFormValues';
import style from './style.module.scss';
import logo from '../../assets/Logo.png';
import { signInAxios } from '../../AxiosRequests/signin';

const Signin = () => { 
    const [eyeOpen, setEyeOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const formik: FormikProps<SignInFormValues> = useFormik<SignInFormValues>({
        initialValues:{
            userName: '', 
            password: ''
        } as SignInFormValues, 
        enableReinitialize: true, 
        validateOnChange:true, 
        validate:(values) => {
            const errors: any = {};
            if(values.userName.trim() === ''){
                errors.userName = 'Username Required'
            }
            if(values.password.trim() === ''){
                errors.password = 'Password required'
            }
            return errors;
        },
        onSubmit: async(_values) => {
            navigate(`/home`, {replace: true})
        }
    })

    const changeUserName = (e: ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue('userName', e.target.value)
    }

    const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue('password', e.target.value);
    }

    const handleToggle = () => {
        setEyeOpen(prev => !prev);
    }

    const isFormValid = async () => {
        const err = await formik.validateForm();
        console.log('err: ', err)
        return err
    } 

    const submitForm = async () => {
        const errors = await isFormValid();
        if(Object.keys(errors).length === 0){
            try{
                const res = await signInAxios(formik);
                if(res.status !== 200){
                    toast.error(res.data.error || 'Unexpected error')
                }
                else{
                    toast.success('Connection succeeded');
                    sessionStorage.setItem('id', res.data.user.id);
                    sessionStorage.setItem('user', JSON.stringify(res.data.user));
                    sessionStorage.setItem('token', res.data.token);
                    await formik.submitForm();
                    formik.resetForm();
                }
            }catch(err: any){
                const errorMsg = err?.response?.data?.error || 'An unexpected error occurred';
                toast.error(errorMsg);
            }
        }
        else{
            toast.error(`Problem during registration- ${Object.values(errors)[0]}`)
        }
    }

    const navigateToSignUp = () => {
        navigate(`/signup`, {replace: true})
    }
    
    return (
        // <div className={style.homePage}>
            <div className={style.signinWrapper}>
                <div className={style.textPart}>
                    <div className={style.welcome}>Welcome</div>
                    <div className={style.subTitle}>Sign in to your Account</div>
                    <div className={style.inputWrapper}>
                        <input type='text' 
                            required
                            name='username'
                            value={formik.values.userName}
                            onChange={changeUserName}
                            placeholder='Username'
                            className={style.inputText}
                        />
                        <div className={style.passwordWrapper}>
                            <input type={eyeOpen ? 'text' : 'password'} 
                                name='password'
                                value={formik.values.password}
                                onChange={changePassword}
                                placeholder='Password'
                                className={style.inputPassword}
                            /> 
                            <span onClick={handleToggle} className={style.eyecon}>
                                {
                                    eyeOpen ?
                                    <VisibilityIcon /> 
                                    :
                                    <VisibilityOffIcon />
                                }
                            </span>
                        </div>
                    </div>
                    <input 
                        type='button'
                        value={'Sign in'}
                        onClick={submitForm}
                        className={style.submitButton}
                    />
                    <div className={style.noAccount}>Don't have any account ? <span className={style.signUp} onClick={navigateToSignUp}>SignUp</span></div>
                </div>
                <div className={style.divider}></div>
                <div className={style.logoPart}>
                    <img src={logo} className={style.logo} />
                </div>
            </div>
        // </div>
    );
}
export default Signin;