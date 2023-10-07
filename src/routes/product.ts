import { Router } from "express";
import productController from '../controllers/product'



export const productRoutes = (): Router => {
  const router = Router();

  router.post('/products', productController.create)


  return router;
}
