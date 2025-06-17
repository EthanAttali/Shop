import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { CATEGORIES, Product } from "../utils/types";

interface ShopContextType {
    category: CATEGORIES;
    handleCategory : (newCat: CATEGORIES) => void;
    products: Product[] | null;
    handleProducts : (products: Product[]) => void;
    filteredProducts: Product[] | null;
    handleFilterProducts: () => void;
    filteredText: string;
    handleInputSearch : (input: string) => void;
}

const ShopContext = createContext<ShopContextType|undefined>(undefined);

interface ShopProviderProps {
    children: ReactNode;
}

export const ShopProvider = ({ children }: ShopProviderProps) => {

    const [category, setCategory] = useState(CATEGORIES.ALL);
    const [products, setProducts] = useState<Product[] | null>(null);
    const [filteredProducts, setFilteredPoducts] = useState<Product[] | null>(null);
    const [filteredText, setFilteredText] = useState('');

    const handleCategory = (newCategory: CATEGORIES) => {
        setCategory(newCategory);
    }

    const handleProducts = (products: Product[]) => {
        setProducts(products);
    }

    const handleFilterProducts = () => {
        const arr = products?.filter((product) => product.product_name.includes(filteredText));
        setFilteredPoducts(arr ?? null);
    }
    
    const handleInputSearch = (input: string) => {
        setFilteredText(input);
    }

    useEffect(() => {
        handleFilterProducts();
    }, [filteredText])

    useEffect(() => {
        handleFilterProducts();
    }, [products])

    return (
        <ShopContext.Provider value={{ category, handleCategory, products, handleProducts,
            filteredProducts, handleFilterProducts, filteredText, handleInputSearch}}>
            {children}
        </ShopContext.Provider>
    )
} 

export const useShopContext = () => {
    const context = useContext(ShopContext);
    if(!context){
        throw new Error('useShopContext must be used within a ShopProvider');
    }
    return context;
}