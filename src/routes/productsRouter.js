import { Router } from "express";
import { addProduct, addOne, getCart, removeOne } from "../controllers/productsController.js";

const router = Router();

router.post('/products', addProduct);
router.post('/mais-um', addOne);
router.post('/menos-um', removeOne);
router.get('/carrinho', getCart);

export default router;