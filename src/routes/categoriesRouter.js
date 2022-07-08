import { Router } from "express";
import { listCategories } from "../controllers/categoriesController.js";

const router = Router();

router.get('/categories', listCategories);

export default router;