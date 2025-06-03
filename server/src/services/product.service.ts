import * as productModel from '../models/product.model'
import { Products } from '../types/products';

export const getProducts = async (category: string | undefined):Promise<Products[]> => {
    return await productModel.allProducts(category);
}

export const getProductsByCategory = async (category: string) => {
    return await productModel.specificCategoryProducts(category);
}