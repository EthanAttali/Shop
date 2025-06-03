import { createContext, ReactNode, useContext, useState } from "react";
import { CATEGORIES } from "../utils/types";

interface ShopContextType {
    category: CATEGORIES;
    handleCategory : (newCat: CATEGORIES) => void;
}

const ShopContext = createContext<ShopContextType|undefined>(undefined);

interface ShopProviderProps {
    children: ReactNode;
}

export const ShopProvider = ({ children }: ShopProviderProps) => {

    const [category, setCategory] = useState(CATEGORIES.ALL);

    const handleCategory = (newCategory: CATEGORIES) => {
        setCategory(newCategory);
    }

    return (
        <ShopContext.Provider value={{ category, handleCategory}}>
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