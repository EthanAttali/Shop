import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, TextField } from "@mui/material";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProductDetailById } from "../../AxiosRequests/getProducts";
import { Product } from "../../utils/types";
import style from './style.module.scss';
import SimilarProducts from '../SimilarProducts';

const ProductDetail = () => {
    const [quantity, setQuantity] = useState<number>(1);

    const [product, setProduct] = useState<Product|null>()
    const {id} = useParams();
    
    useEffect(() => {
        const getProductById = async () => {
            if(!id){
                toast('Unknown product')
            }
            else{
                try {
                    const res = await getProductDetailById(id!)
                    if (res.status !== 200) {
                        toast.error(res.data.error || 'Unexpected error');
                    } else {
                        setProduct(res.data[0])
                    }
                } catch (err: any) {
                    const errorMsg = err?.response?.data?.error;
                    toast.error(errorMsg); 
                }
            }
        }

        getProductById()

    }, [id])


    const LessOne = () => {
        setQuantity(prev => prev - 1);
    }

    const PlusOne = () => {
        setQuantity(prev => prev + 1);
    }

    return(
        <div className={style.productContainer}>
            {
                product ? 
                <div className={style.product}>
                    <div> <img className={style.img} src={product?.image_path} /></div>
                    <div className={style.productDetail}>
                        <div className={style.title}>
                            {product?.product_name} 
                            <span className={style.new}>NEW</span>
                        </div>
                        <div className={style.description}>{product?.description}</div>
                        <div className={classNames(style.price, product?.newprice != product?.price && style.reduction)}>
                            {product?.price}$
                        </div>
                        {product?.newprice != product?.price && 
                            <div className={classNames(style.price, style.red)}>{product?.price}$</div>
                        }
                        <div className={style.stock}>
                            {
                            product?.stock > 0 ? 
                                <span className={style.stockGroup}><CheckCircleIcon sx={{color: 'green'}}/> En stock</span> 
                                : 
                                <span className={style.stockGroup}><CancelIcon /> Rupture de stock</span>
                            }
                        </div>
                        <div className={style.cardGroup}>
                            <Button className={style.buttonStock} onClick={LessOne} disabled = {quantity <= 1}> - </Button>
                            <TextField className={style.inputQuantity} value={quantity}/>
                            <Button className={style.buttonStock} onClick={PlusOne}> + </Button>
                            
                            <Button className={style.card} onClick={() => toast.success('Add to card')}> Add to card</Button>
                        </div>
                    </div>
                </div>
                : 
                <div>Error with the product</div>
            }   
            <SimilarProducts category={product?.category_name}/>
        </div>
    )
}
export default ProductDetail;