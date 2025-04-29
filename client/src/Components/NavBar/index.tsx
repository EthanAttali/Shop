import { redirect, useNavigate } from 'react-router-dom';
import style from './style.module.scss';
import SettingsIcon from '@mui/icons-material/Settings';

const NavBar = () => {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '');

    const moveToHome = () => {
        navigate(`/home`, {replace: true});
    }

    const moveToAbout = () => {
        navigate(`/about`, {replace: true});
    }

    const moveToContact = () => {
        navigate(`/contact`, {replace: true});
    }

    const moveToAdmin = () => {
        navigate(`admin`, {replace: true})
    }

    const moveToSetting = () => {
        navigate(`setting`, {replace: true})
    }

    return(
        <div className={style.navBar}>
            <div className={style.shopName}>
                SHOP NAME
            </div>
            <div className={style.rightPart}>
                <div onClick={moveToHome} className={style.proposition}>HOME</div>
                <div onClick={moveToAbout} className={style.proposition}>ABOUT</div>
                <div onClick={moveToContact} className={style.proposition}>CONTACT_US</div>
                {user!.role === 'ADMIN' && <div onClick={moveToAdmin} className={style.proposition}>ADMIN</div>}
                <div onClick={moveToSetting} className={style.settings}><SettingsIcon/></div>
            </div>
        </div>
    )
}
export default NavBar;