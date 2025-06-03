import SearchBar from '../Search';
import style from './style.module.scss';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import classNames from 'classnames';
import { CATEGORIES } from '../../utils/types';
import { useShopContext } from '../../context/useShopContext';

const ToolBar = () => {

    const {handleCategory, category} = useShopContext();

    const handleSelectedCategory = (category: CATEGORIES) => {
        // setSelectedCategory(category)
        handleCategory(category)
    }

    return(
        <div className={style.container}>
            {/* <div className={style.leftPart}> */}
            {/* </div> */}
            <div className={style.middlePart}>
                <div onClick={() => handleSelectedCategory(CATEGORIES.ALL)} 
                    className={classNames(style.category, category=== CATEGORIES.ALL && style.selected)}>
                    {CATEGORIES.ALL.toUpperCase()}
                </div>
                <div onClick={() => handleSelectedCategory(CATEGORIES.SHOES)} 
                    className={classNames(style.category, category=== CATEGORIES.SHOES && style.selected)}>
                    {CATEGORIES.SHOES.toUpperCase()}
                </div>
                <div onClick={() => handleSelectedCategory(CATEGORIES.CAPS)} 
                    className={classNames(style.category, category=== CATEGORIES.CAPS && style.selected)}>
                    {CATEGORIES.CAPS.toUpperCase()}
                </div>
                <div onClick={() => handleSelectedCategory(CATEGORIES.WATCHES)}
                    className={classNames(style.category, category=== CATEGORIES.WATCHES && style.selected)}>
                    {CATEGORIES.WATCHES.toUpperCase()}
                </div>
                <div onClick={() => handleSelectedCategory(CATEGORIES.TEESHIRTS)}
                    className={classNames(style.category, category=== CATEGORIES.TEESHIRTS && style.selected)}>
                    {CATEGORIES.TEESHIRTS.toUpperCase()}
                </div>
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