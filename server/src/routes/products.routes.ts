import { Router } from "express"
import * as productController from '../controllers/product.controller'

const router = Router();

router.get('/', productController.getProducts);
router.get('/similar-products', productController.getSimilarProducts)
// router.get('/:id', productController.getProductById);

export default router;