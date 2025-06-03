import {Request, Response} from 'express';
import * as productService from '../services/product.service';

export const getProducts = async(req: Request, res: Response) => {
    try{
        const category = req.query.category as string ?? undefined;
        const products = await productService.getProducts(category);
        res.json(products)
    }
    catch(error: any){
        res.status(500).json({error: error.message});
    }
}