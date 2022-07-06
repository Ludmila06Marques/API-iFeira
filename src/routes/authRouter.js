import { Router } from "express"
import { createUser } from "../controllers/authController.js";
import { loginuser } from "../controllers/authController.js";



const router =Router()

router.post('/sign-up',createUser)
router.post('/sign-in',loginuser)


export default router;