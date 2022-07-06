import express from "express"
import cors from "cors"
import appRouter from './routes/appRouter.js'
import authRouter from './routes/authRouter.js'

//LINK PARA ROTAS NO FRONT : https://ifeiraapp.herokuapp.com/ 


const app=express()
app.use(express.json())
const corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200
  }
  app.use(cors(corsOptions));

app.use(authRouter)
app.use(appRouter)





		app.listen(process.env.PORT ,()=>{
		    console.log("ta funfando")
		})