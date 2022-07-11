import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import appRouter from './routes/appRouter.js';
import authRouter from './routes/authRouter.js';
import productsRouter from "./routes/productsRouter.js";
import categoriesRouter from "./routes/categoriesRouter.js";
import checkoutRouter from "./routes/checkoutRouter.js";

//LINK PARA ROTAS NO FRONT : https://ifeiraapp.herokuapp.com/ 

dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());

app.use(authRouter);
app.use(appRouter);
app.use(productsRouter);
app.use(categoriesRouter);
app.use(checkoutRouter);





app.listen(process.env.PORT ,()=>{
	console.log("ta funfando na porta" + process.env.PORT);
});
