import { db } from "../dbStrategy/mongo.js";

export async function calculaValorTotal(req, res) {
    const { authorization }= req.headers;
    const token= authorization?.replace("Bearer ", "");

    if (!token) {
        return res.statusSend(401); 
    }

    const session = await db.collection("sessoes").findOne({ token });    

    try {
        const cartsCollection = db.collection("carts");
        const cart = await cartsCollection.findOne({ userId: session.userId });
        const products = cart.produtos;
        let valorTotal = 0;
        products.forEach((product) => {
            const preco = parseFloat(((product.preco.replace(",",".")) * product.qtd).toFixed(2));
            valorTotal += preco;
        })
        res.send(valorTotal.toString()).status(200);
    } catch(error) {
        res.sendStatus(500)
    }
}