import { Router } from "express";
import { addProduct } from "../controllers/productsController.js";

const router = Router();

router.post('/products', addProduct);

export default router;