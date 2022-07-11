import { Router } from "express";
import { calculaValorTotal } from "../controllers/checkoutController.js";

const router = Router();

router.get('/checkout', calculaValorTotal);

export default router;