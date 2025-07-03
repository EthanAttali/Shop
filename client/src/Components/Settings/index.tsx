import SettingsIcon from '@mui/icons-material/Settings';
import { FormikProps, useFormik } from 'formik';
import { useEffect } from 'react';
import style from './style.module.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import logo from '../../assets/Logo.png';
import { checkWhatsappCode, sendWhatsappCode, updatePersonalInfos } from '../../AxiosRequests/settings';
import { PersonalUserInfo, User } from '../../utils/types';

const Settings = () => {

    const [eyeOpen, setEyeOpen] = useState<boolean>(false);
    const [user, setUser] = useState<User|null>(null);
    const [codeSent, setCodeSent] = useState<Boolean>(false);
    const [codeConfirm, setCodeConfirm] = useState<Boolean>(false);
    const [code, setCode] = useState<number>()

    //read from local storage
    useEffect(() => {
        const user = sessionStorage.getItem("user") ?? '';
        setUser(JSON.parse(user));
    }, [])

    // const navigate = useNavigate();

    const formik: FormikProps<PersonalUserInfo> = useFormik<PersonalUserInfo>({
            initialValues:{
                username: user?.username, 
                name:user?.name,
                email:user?.email,
                password: ''
            } as PersonalUserInfo, 
            enableReinitialize: true, 
            validateOnChange:true, 
            validate:(values) => {
                const errors: any = {};
                if(values.username.trim() === ''){
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
                // navigate(`/products`, {replace: true})
            }
        })
    
        const changeUserName = (e: ChangeEvent<HTMLInputElement>) => {
            formik.setFieldValue('username', e.target.value);
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
            Object.keys(err).length !== 0 && console.log('err: ', err)
            return err
        } 
    
        const submitForm = async () => {
            const errors = await isFormValid();
            if(Object.keys(errors).length === 0){
                try {
                    const res = await updatePersonalInfos(formik, user!.id);
                    if (res.status !== 200) {
                        toast.error(res.data.error || 'Unexpected error');
                    } else {
                            toast.success('Successfully updated');
                            sessionStorage.setItem('id', res.data.user.id);
                            sessionStorage.setItem('user', JSON.stringify({
                                username: formik.values.username, 
                                name: formik.values.name,
                                email: formik.values.email, 
                                role: user?.role}));
                        sessionStorage.setItem('token', res.data.token);
                        await formik.submitForm();
                        formik.resetForm();
                    }
                } catch (err: any) {
                    // Si backend a bien envoyé une erreur personnalisée
                    const errorMsg = err?.response?.data?.error /*|| 'An unexpected error occurred'*/;
                    toast.error(errorMsg); // Affiche dans une notification
                }
            }
            else{
                toast.error(`Problem during registration- ${Object.values(errors)[0]}`)
            }
        }

        const sendMessage = async () => {
            await sendWhatsappCode();
            toast.success('Code sent')
            setCodeSent(true);
        }

        const updateCode = (e: ChangeEvent<HTMLInputElement>) => {
            setCode(Number(e.target.value))
        }

        const validateCode = async () => {
            try {
                const res = await checkWhatsappCode(code ?? 0)
                console.log(res);
                setCodeConfirm(true);                
            } catch (error: any) {
                const message = error.response?.data?.error || 'Unknown error'
                console.log('error: ', message)
                toast.error(message)
            }
        }

    return(
        <div className={style.settingPage}>
            <div className={style.title}>Settings <SettingsIcon className={style.settingsIcon}/></div>
            <div className={style.fieldsWrapper}>
                <div className={style.textPart}>
                    <div className={style.topPart}>
                        <div className={style.inputWrapper}>
                            <div className={style.field}>
                                <span>UserName:</span>
                                <input type='text' 
                                    required
                                    name='username'
                                    value={formik.values.username}
                                    onChange={changeUserName}
                                    placeholder='Username'
                                    className={style.inputText}
                                />
                            </div>
                            <div className={style.field}>
                                <span>Name:</span>
                                <input type='text' 
                                    required
                                    name='name'
                                    value={formik.values.name}
                                    onChange={changeName}
                                    placeholder='Name'
                                    className={style.inputText}
                                />
                            </div>
                            <div className={style.field}>
                                <span>Email:</span>
                                <input type='email' 
                                    required
                                    name='email'
                                    value={formik.values.email}
                                    onChange={changeEmail}
                                    placeholder='Email'
                                    className={style.inputText}
                                />
                            </div>
                            <div className={style.field}>
                                {
                                codeSent ?
                                    codeConfirm?
                                        <div /*className={style.field}*/>
                                            <span>Password:</span>
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
                                    :
                                    <div className={style.codeVerification}>
                                        <input 
                                            type='text' 
                                            name='codeVerif' 
                                            onChange={updateCode} 
                                            value={code}
                                            placeholder='Enter code'
                                            className={style.inputPassword}
                                        />
                                        <div className={style.groupButton}>
                                            <button onClick={validateCode} className={style.button}>Submit</button>
                                            <button onClick={sendMessage} className={style.button}> Resend</button>
                                        </div>
                                    </div>   
                                :
                                <>
                                    <div>Update your password ? Click to receive confirmation code</div>
                                    <button onClick={sendMessage}> Send Code</button>
                                </>
                            }
                            </div>
                        </div>
                        <div className={style.divider}></div>
                        <div className={style.logoPart}>
                            <img src={logo} className={style.logo}/>
                        </div>
                    </div>
                    <input 
                    type='button'
                    value={'Update'}
                    onClick={submitForm}
                    className={style.submitButton}
                    />
                </div>
            </div>
        </div>
    )
}
export default Settings

