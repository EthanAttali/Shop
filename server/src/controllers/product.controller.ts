import {Request, Response} from 'express';
import * as productService from '../services/product.service';

export const getProducts = async(req: Request, res: Response) => {
    try{
        const category = req.query.category as string | undefined;
        const id = req.query.id as string;
        
        if(id){
            const product = await productService.getProductById(Number(id))
            if(!product) res.status(404).json({message: 'Produit non trouve'});
            res.status(200).json(product);
        }
        else{
            const products = await productService.getProducts(category as string | undefined);
            res.json(products)
        }
    }
    catch(error: any){
        res.status(500).json({error: error.message});
    }
}

export const getSimilarProducts = async(req: Request, res: Response) => {
    try {
        const category = req.query.category as string;
        const id = req.query.id as string;

        const similarProducts = await productService.getSimilarProducts(category, Number(id));
        if(!similarProducts) {
            res.status(404).json({message: 'Produit non trouve'});
        }
        res.status(200).json(similarProducts);
    } catch (error: any) {
        res.status(500).json({error: error.message});
    }
}