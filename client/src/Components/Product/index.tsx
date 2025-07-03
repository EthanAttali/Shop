import classNames from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../utils/types';
import style from './style.module.scss';

interface ProductProps {
    product: Product
}

const ProductCard = ({product}: ProductProps) => {

    const [imageHover, setImageHover] = useState(false);
    const navigate = useNavigate();

    const updateImageHover = () => {
        setImageHover((prev) => !prev);
    }

    const moveToDetail = () => {
        navigate(`/products/${product.id}`)
    }

    return(
        <div className={style.productCard} onClick={moveToDetail}>
            <div className={style.img} onMouseEnter={updateImageHover} onMouseLeave={updateImageHover}>
                <img src={product.image_path} alt='Test' className={style.img}/>
                {imageHover && (
                    <div className={style.overlay}><p>{product.description}</p></div>
                )}
            </div>
            <div className={style.bottomCard} >
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