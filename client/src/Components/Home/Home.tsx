import ToolBar from '../ToolBar';
import style from './style.module.scss';

const Home = () => { 
    const products = [
        {
          product_id: 1,
          name: "Clavier mécanique RGB",
          description: "Clavier gaming avec rétroéclairage personnalisable",
          price: 89.99,
          stock: 120,
          category_id: 1,
          category_name: "Informatique",
          percentage_discount: 10
        },
        {
          product_id: 2,
          name: "Chaussures de running Nike Air",
          description: "Légères et confortables, idéales pour le sport",
          price: 129.99,
          stock: 75,
          category_id: 2,
          category_name: "Sport",
          percentage_discount: 15
        },
        {
          product_id: 3,
          name: "Bouteille isotherme 750ml",
          description: "Garde vos boissons chaudes pendant 12h et froides 24h",
          price: 24.99,
          stock: 200,
          category_id: 3,
          category_name: "Maison",
          percentage_discount: 5
        },
        {
          product_id: 4,
          name: "Écouteurs sans fil Bluetooth",
          description: "Autonomie de 6h avec réduction de bruit",
          price: 59.99,
          stock: 150,
          category_id: 1,
          category_name: "Informatique",
          percentage_discount: 0
        },
        {
          product_id: 5,
          name: "Lunettes de soleil polarisées",
          description: "Protection UV400 et verres polarisés pour plus de confort",
          price: 49.90,
          stock: 95,
          category_id: 4,
          category_name: "Mode",
          percentage_discount: 20
        }
      ];
    
    return (
        <div className={style.homePage}>
            <ToolBar />
            <div>
                {products.map((product) => {
                    return(
                        <div>
                            <div>{product.name}</div>
                            <div>{product.description}</div>
                            <div>{product.price}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
export default Home;