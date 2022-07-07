import express from "express"
import cors from "cors"
import appRouter from './routes/appRouter.js'
import authRouter from './routes/authRouter.js'
import dotenv from "dotenv"

//LINK PARA ROTAS NO FRONT : https://ifeiraapp.herokuapp.com/ 

dotenv.config()
const app=express()
app.use(express.json())
app.use(cors())

app.use(authRouter)
app.use(appRouter)





		app.listen(process.env.PORT ,()=>{
		    console.log("ta funfando" )
		})