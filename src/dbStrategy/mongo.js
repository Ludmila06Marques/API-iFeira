import {MongoClient} from "mongodb"
import dotenv from "dotenv"

dotenv.config()
let db= null


const cliente= new MongoClient(process.env.MONGO_URI)
cliente.connect().then(()=>{
db=cliente.db(process.env.BANCO_DE_DADOS)
})

export  {db}