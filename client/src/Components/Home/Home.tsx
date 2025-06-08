import { useEffect, useState } from 'react';
import { getProducts } from '../../AxiosRequests/getProducts';
import { useShopContext } from '../../context/useShopContext';
import ProductCard from '../Product';
import ToolBar from '../ToolBar';
import style from './style.module.scss';
import SupremeLogo from '/photos/Supreme.jpg';
import TissotLogo from '/photos/tissot.jpg';
import PumaLogo from '/photos/puma.jpg';
import AsicsLogo from '/photos/asics.jpg';
import VansLogo from '/photos/vans.jpg';
import RolexLogo from '/photos/Rolex.jpg';
import TagHeuerLogo from '/photos/tagheuer.jpg';
import OmegaLogo from '/photos/omega.jpg';
import AudemarsPiguetLogo from '/photos/Audemars-Piguet_logo.jpg';
import AdidasLogo from '/photos/adidas.jpg';

const Home = () => { 

  const [products, setProducts] = useState([])
    // const products:Product[] = [
    //     {
    //       id: 1,
    //       name: "Clavier mécanique RGB",
    //       description: "Clavier gaming avec rétroéclairage personnalisable",
    //       price: 89.99,
    //       stock: 120,
    //       img_path:'../../photos/images.jpg',
    //       category_id: 1,
    //       category_name: "Informatique",
    //       percentage_discount: 10
    //     },
    //     {
    //       id: 2,
    //       name: "Chaussures de running Nike Air",
    //       description: "Légères et confortables, idéales pour le sport",
    //       price: 129.99,
    //       stock: 75,
    //       img_path:'../../photos/LotemEmblem.png',
    //       category_id: 2,
    //       category_name: "Sport",
    //       percentage_discount: 15
    //     },
    //     {
    //       id: 3,
    //       name: "Bouteille isotherme 750ml",
    //       description: "Garde vos boissons chaudes pendant 12h et froides 24h",
    //       price: 24.99,
    //       stock: 200,
    //       img_path: '../../photos/images.jpg',
    //       category_id: 3,
    //       category_name: "Maison",
    //       percentage_discount: 5
    //     },
    //     {
    //       id: 4,
    //       name: "Écouteurs sans fil Bluetooth",
    //       description: "Autonomie de 6h avec réduction de bruit",
    //       price: 59.99,
    //       stock: 150,
    //       img_path: '../../photos/Logo.jpg',
    //       category_id: 1,
    //       category_name: "Informatique",
    //       percentage_discount: 0
    //     },
    //     {
    //       id: 5,
    //       name: "Lunettes de soleil polarisées",
    //       description: "Protection UV400 et verres polarisés pour plus de confort",
    //       price: 49.90,
    //       stock: 95,
    //       img_path: '../../photos/Tsahal.jpg',
    //       category_id: 4,
    //       category_name: "Mode",
    //       percentage_discount: 20
    //     }
    // ];
  const context = useShopContext();

  const retrieveProducts = async() => {
    const response  = await getProducts(context.category);
    setProducts(response.data);
  }

  useEffect(() => {
    retrieveProducts();
  }, [context.category])

    // const displayProducts = () => {
    //   const { data: products, error, isLoading} = useQuery('productsData', retrieveProducts)
    // }

  return (
      <div className={style.homePage}>
          <ToolBar />
          <div className={style.productContent}>
            <div className={style.productList}>
                  {products.map((product, index) => {
                      return(
                          <ProductCard key={index} product={product}/>
                      )
                  })}
            </div>
          </div>
          <div className={style.bottomPage}>
            <p className={style.text}>Our partners</p>
            <div className={style.gridPartners}>
              <img src={SupremeLogo} className={style.logo}/>
              <img src={TissotLogo} className={style.logo}/>
              <img src={PumaLogo} className={style.logo}/>
              <img src={AsicsLogo} className={style.logo}/>
              <img src={VansLogo} className={style.logo}/>
              <img src={RolexLogo} className={style.logo}/>
              <img src={TagHeuerLogo} className={style.logo}/>
              <img src={OmegaLogo} className={style.logo}/>
              <img src={AudemarsPiguetLogo} className={style.logo}/>
              <img src={AdidasLogo} className={style.logo}/>
            </div>
          </div>
      </div>
  );
}
export default Home;