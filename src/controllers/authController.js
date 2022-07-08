import { userSchema , loginSchema} from "../schemas/authSchema.js"
import bcrypt from 'bcrypt';
import { db } from "../dbStrategy/mongo.js";

export async function createUser(req,res){
    const usuario = req.body;

    const { error } = userSchema.validate(usuario) ;
    if (error) {
        return res.sendStatus(422);
    } 

    const passwordCripted = bcrypt.hashSync(usuario.password , 10);

    try {

        const emailExists=  await db.collection("users").findOne({email:usuario.email })
        if(emailExists){
            return res.status(409).send("Usuario ja cadastrado")
        
        }else{
            await db.collection("users").insertOne({...usuario , password: passwordCripted })
        
            return res.status(201).send("usuario criado com sucesso");
        

        }   
    } catch (error) {
    console.log(error)
    return  res.send("deu ruim")
    
    }
}

export async function loginuser(req,res){
    const usuario=req.body

    const { error } = loginSchema.validate(usuario) 
    if (error) {
        console.log(error)
        return res.sendStatus(422)
    
    } 

    try {

    const userExist=  await db.collection("users").findOne({email:usuario.email  })


    if(userExist && bcrypt.compareSync(usuario.password , userExist.password)){

        const token= uuid()
        await db.collection('sessoes').insertOne({token , userId:userExist._id })
    
        
        return   res.status(201).send({token , userExist })

        
    }else{
        return  res.status(401).send("Senha ou email incorretos")
        

    }    
    } catch (error) {
        console.log(error)
        return res.send("deu ruim")
    }

}
