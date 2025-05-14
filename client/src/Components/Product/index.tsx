import { Product } from '../../utils/types';
import style from './style.module.scss';
import classNames from 'classnames';
import logo from '../../assets/Logo.png';

interface ProductProps {
    product: Product
}

const ProductCard = ({product}: ProductProps) => {

    return(
        <div className={style.productCard}>
            <div className={style.img}><img src={logo} alt='' className={style.img}/></div>
            <div className={style.bottomCard}>
                <div className={style.name}>{product.name}</div>
                <div className={style.pricePart}>
                    <div className={classNames(style.price, product.percentage_discount != 0 && style.reduction)}>{product.price}$</div>
                    {product.percentage_discount != 0 && <div className={style.reducePrice}>
                        {Math.round(product.price - (product.percentage_discount/100)*product.price).toFixed(2)}$ 
                    </div>}
                </div>
            </div>
        </div>
    )
}
export default ProductCard;