import * as productModel from '../models/product.model'
import { Products } from '../types/products';

export const getProducts = async (category: string | undefined):Promise<Products[]> => {
    return await productModel.allProducts(category);
}

export const getProductsByCategory = async (category: string) => {
    return await productModel.specificCategoryProducts(category);
}

export const getProductById = async(id: number) => {
    return await productModel.getProductById(id);
}

export const getSimilarProducts = async(category: string, id: number) => {
    return await productModel.getSimilarProducts(category, id);
}