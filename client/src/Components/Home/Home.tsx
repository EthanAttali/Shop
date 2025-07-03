import { useEffect } from 'react';
import { getProducts } from '../../AxiosRequests/getProducts';
import { useShopContext } from '../../context/useShopContext';
import ProductCard from '../Product';
import ToolBar from '../ToolBar';
import style from './style.module.scss';
import AudemarsPiguetLogo from '/photos/Audemars-Piguet_logo.jpg';
import RolexLogo from '/photos/Rolex.jpg';
import SupremeLogo from '/photos/Supreme.jpg';
import AdidasLogo from '/photos/adidas.jpg';
import AsicsLogo from '/photos/asics.jpg';
import OmegaLogo from '/photos/omega.jpg';
import PumaLogo from '/photos/puma.jpg';
import TagHeuerLogo from '/photos/tagheuer.jpg';
import TissotLogo from '/photos/tissot.jpg';
import VansLogo from '/photos/vans.jpg';

const Home = () => { 

  const context = useShopContext();

  const retrieveProducts = async() => {
    const response  = await getProducts(context.category);
    context.handleProducts(response.data)
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
                  {context.filteredProducts?.map((product, index) => {
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