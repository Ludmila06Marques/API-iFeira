import { Router } from "express";
import { calculaValorTotal, confirmaPedido, retornaPedidos } from "../controllers/checkoutController.js";

const router = Router();

router.get('/checkout', calculaValorTotal);
router.post('/confirma-pedido', confirmaPedido);
router.get('/pedidos', retornaPedidos);

export default router;