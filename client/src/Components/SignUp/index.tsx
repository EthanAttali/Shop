import { FormikProps, useFormik } from 'formik';
import style from './style.module.scss'
import SignUpFormValues from '../../utils/SignUpFormValues';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import logo from '../../assets/Logo.png';
import { signUpAxios } from '../../AxiosRequests/signup';

const SignUp = () => {

    const [eyeOpen, setEyeOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const formik: FormikProps<SignUpFormValues> = useFormik<SignUpFormValues>({
            initialValues:{
                userName: '', 
                name:'',
                email:'',
                password: ''
            } as SignUpFormValues, 
            enableReinitialize: true, 
            validateOnChange:true, 
            validate:(values) => {
                const errors: any = {};
                if(values.userName.trim() === ''){
                    errors.userName = 'Username Required'
                }
                if(values.name.trim() === ''){
                    errors.name = 'Name Required'
                }
                if(values.email.trim() === ''){
                    errors.email = 'Email Required'
                }
                else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
                    errors.email = 'Invalid Email Address'
                }
                if(values.password.trim() === ''){
                    errors.password = 'Password Required'
                }
                return errors;
            },
            onSubmit: async(_values) => {
                navigate(`/home`, {replace: true})
            }
        })
    
        const changeUserName = (e: ChangeEvent<HTMLInputElement>) => {
            formik.setFieldValue('userName', e.target.value);
        }
        
        const changeName = (e: ChangeEvent<HTMLInputElement>) => {
            formik.setFieldValue('name', e.target.value);
        }

        const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
            formik.setFieldValue('email', e.target.value);
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
                try {
                    const res = await signUpAxios(formik);
                
                    if (res.status !== 201) {
                        toast.error(res.data.error || 'Unexpected error');
                    } else {
                        toast.success('Registration succeeded');
                        localStorage.setItem('id', res.data.user.id);
                        localStorage.setItem('user', JSON.stringify(res.data.user));
                        localStorage.setItem('token', res.data.token);
                        await formik.submitForm();
                        formik.resetForm();
                    }
                } catch (err: any) {
                    // Si backend a bien envoyé une erreur personnalisée
                    const errorMsg = err?.response?.data?.error || 'An unexpected error occurred';
                    toast.error(errorMsg); // Affiche dans une notification
                }
            }
            else{
                toast.error(`Problem during registration- ${Object.values(errors)[0]}`)
            }
        }

    return (
        <div className={style.signupWrapper}>
            <div className={style.textPart}>
                <div className={style.welcome}>Welcome</div>
                <div className={style.subTitle}>Create your account</div>
                <div className={style.inputWrapper}>
                    <input type='text' 
                        required
                        name='username'
                        value={formik.values.userName}
                        onChange={changeUserName}
                        placeholder='Username'
                        className={style.inputText}
                        />
                    <input type='text' 
                        required
                        name='name'
                        value={formik.values.name}
                        onChange={changeName}
                        placeholder='Name'
                        className={style.inputText}
                        />
                    <input type='email' 
                        required
                        name='email'
                        value={formik.values.email}
                        onChange={changeEmail}
                        placeholder='Email'
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
                    value={'Create'}
                    onClick={submitForm}
                    className={style.submitButton}
                />
            </div>
            <div className={style.divider}></div>
            <div className={style.logoPart}>
                <img src={logo} className={style.logo}/>
            </div>
        </div>
    )
}
export default SignUp