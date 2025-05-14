import SearchBar from '../Search';
import style from './style.module.scss';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ToolBar = () => {
    return(
        <div className={style.container}>
            {/* <div className={style.leftPart}> */}
            {/* </div> */}
            <div className={style.middlePart}>
                <div className={style.category}>SHOES</div>
                <div className={style.category}>CAPS</div>
                <div className={style.category}>WATCHES</div>
                <div className={style.category}>TEE-SHIRTS</div>
            </div>
            <div className={style.rightPart}>
                <div className={style.search}>
                    <SearchBar />
                </div>
                <div className={style.cart}>
                    <ShoppingCartIcon />
                </div>
            </div>
        </div>
    )
}

export default ToolBar