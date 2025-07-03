import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSimilarProducts } from "../../AxiosRequests/getProducts";
import { Product } from "../../utils/types";
import style from './style.module.scss';
import classNames from "classnames";
import { Button } from "@mui/material";
import ArrowBack from '@mui/icons-material/ArrowBackIosNew';
import ArrowForward from '@mui/icons-material/ArrowForwardIos';

interface SimilarProductsProps{
    category: string | undefined;
}

const MAX_PRODUCTS = 4;

const SimilarProducts = ({category}: SimilarProductsProps) => {

    const [similarProducts, setSimilarProducts] = useState<Product[]>([])
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const {id} = useParams();

    const handleNext = () => {
        if(similarProducts.length <= MAX_PRODUCTS) return;
        setCurrentIndex((prevIndex) => (prevIndex + 1) % similarProducts.length);
    }

    const handlePrev = () => {
        if(similarProducts.length <= MAX_PRODUCTS) return;
        setCurrentIndex((prevIndex) => (prevIndex - 1 + similarProducts.length) % similarProducts.length);
    }

    const visibleProducts = () => {
        if (similarProducts.length <= MAX_PRODUCTS) return similarProducts;

        const end = currentIndex + MAX_PRODUCTS;
        if (end <= similarProducts.length) {
        return similarProducts.slice(currentIndex, end);
        } else {
        return [
            ...similarProducts.slice(currentIndex),
            ...similarProducts.slice(0, end % similarProducts.length),
        ];
        }
    };

    const moveToProduct = (id: number) => {
        navigate(`/products/${id}`);
    }

    useEffect(() => {
        const getSimilarProductById = async () => {
            if(!category || !id){
                // toast('Unknown product')
                // navigate('/products')
            }
            else{
                try {
                    const res = await getSimilarProducts(category, id)
                    if (res.status !== 200) {
                        toast.error(res.data.error || 'Unexpected error');
                    } else {
                        setSimilarProducts(res.data);
                    }
                } catch (err: any) {
                    const errorMsg = err?.response?.data?.error;
                    toast.error(errorMsg); 
                }
            }
        }
        
        getSimilarProductById()
    }, [category])

    useEffect(() => {
        const interval = setInterval(() => {handleNext()}, 5000)
        return () => clearInterval(interval);
    }, [currentIndex, similarProducts])


    return (
        <div className={style.similarProductsContainer}>
            <div className={style.title}>Similar Products</div>
            {/* <div> */}
                <div className={style.productsContainer}> {/*carousel-container*/}
                    <Button onClick={handlePrev}><ArrowBack /></Button>
                    {visibleProducts().map((prod, index) => {    
                        return (  
                            <div key={index} className={style.productContainer} onClick={() => moveToProduct(prod.id)}> {/*carousel-item*/}
                                <img src={prod.image_path} className={style.img}/>
                                <div className={style.name}>{prod.product_name}</div>   
                                <div className={style.pricePart}>
                                    <div className={classNames(style.price, prod.price != prod.newprice && style.reduction)}>
                                        {prod.price}$
                                    </div>
                                    {prod.price != prod.newprice && 
                                        <div className={style.reducePrice}>
                                            {prod.newprice}$ 
                                        </div>
                                    }
                                </div>
                            </div>      
                        )
                    })}
                    <Button onClick={handleNext}><ArrowForward /></Button>
                    {/* </div> */}
                </div>
        </div>
    )
}

export default SimilarProducts