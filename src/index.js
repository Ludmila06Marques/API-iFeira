import express from "express"
import cors from "cors"
import appRouter from './routes/appRoutes.js'
import authRouter from './routes/authRoutes.js'

//LINK PARA ROTAS NO FRONT : https://ifeiraapp.herokuapp.com/ 


const app=express()
app.use(express.json())
app.use(cors())


app.use(authRouter)
app.use(appRouter)



		app.listen(process.env.PORT ,()=>{
		    console.log("ta funfando")
		})