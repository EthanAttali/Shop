import { Product } from '../../utils/types';
import style from './style.module.scss';
import classNames from 'classnames';

interface ProductProps {
    product: Product
}

const ProductCard = ({product}: ProductProps) => {

    return(
        <div className={style.productCard}>
            <div className={style.img}><img src={product.image_path} alt='Test' className={style.img}/></div>
            <div className={style.bottomCard}>
                <div className={style.name}>{product.product_name}</div>
                <div className={style.pricePart}>
                    <div className={classNames(style.price, product.price != product.newprice && style.reduction)}>{product.price}$</div>
                    {product.price != product.newprice && 
                        <div className={style.reducePrice}>
                            {product.newprice}$ 
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default ProductCard;