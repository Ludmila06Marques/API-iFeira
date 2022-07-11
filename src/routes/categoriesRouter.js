import { Router } from "express";
import { listCategories, listItemsFromCategory } from "../controllers/categoriesController.js";

const router = Router();

router.get('/categories', listCategories);
router.post('/category', listItemsFromCategory);

export default router;