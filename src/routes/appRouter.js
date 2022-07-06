import { Router } from "express"
import {get_products} from "../controllers/appController.js"

const router =Router()


router.get('/products' , get_products)




export default router;