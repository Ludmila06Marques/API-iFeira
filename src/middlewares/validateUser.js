import {db} from "../dbStrategy/mongo.js"



async function validateUser(req,res,next){
    const {authorization}= req.headers
    const token= authorization?.replace('Bearer ', '').trim();
   
    if(!token) return res.status(401).send("Nao tem token"); 

    try {
    const session = await  db.collection('sessoes').findOne({token})

    if(!session){
        return res.status(401).send("token nao existe")
    }
  const gaveta =session.userId
  console.log(gaveta)
    const user = await db.collection("users").findOne({_id: gaveta});
   console.log(user)
    if(!user) return res.status(401).send("No user found."); // unauthorized
    res.locals.user = user;
        next()
    } catch (error) {
        console.log("Erro ao tentar obter usuário através da sessão");
    console.log(error);
    return res.sendStatus(500);
    }
   
    
    
   // res.locals.session= session  mandar alguma variavel daq pra outro lugar 
   // recebe assim: session= res.locals.session 
 


}
export default validateUser