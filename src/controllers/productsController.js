import { productSchema } from "../schemas/productSchema.js";
import { db } from "../dbStrategy/mongo.js";

export async function addProduct(req, res) {
    const product = req.body;
    // name:
    // image:
    // price:
    // category: (carnes, verduras, legumes, frutas)

    const { error } = productSchema.validate(product);

    if (error) {
        // Unprocessable Entity
        return res.sendStatus(422);
    }

    try {
        const productsCollection = db.collection("products");
        const checkExists = await productsCollection.findOne({ name: product.name });
        if (checkExists) {
            // Conflict
            return res.sendStatus(409);
        } else {
            await productsCollection.insertOne(product);
            // Created
            return res.sendStatus(201);
        }
    } catch(error) {
        // Internal Server Error
        return res.sendStatus(500);
    }
}

export async function addOne(req, res) {
    const product = req.body.name;
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
        if (products.some(e => e.name === product)) {
            console.log("ta no carrinho")
            // Se o produto estiver no carrinho já
            for (let i=0; i<products.length; i++) {
                if (products[i].name === product) {
                    const quantidade = products[i].qtd + 1;
                    const array = [{ name: product, qtd: quantidade }, ...products];
                    array.splice(i+1, 1);
                    await cartsCollection.updateOne({ userId: session.userId }, { $set: { produtos: array }});
                    const arrayProdutos = await cartsCollection.findOne({ userId: session.userId });
                    return res.send(arrayProdutos.produtos).status(200);
                }
            }
        } else {
            console.log("não ta no carrinho")
            // Se o produto ainda não estiver no carrinho
            const array = [{ name: product, qtd: 1 }, ...products];
            await cartsCollection.updateOne({ userId: session.userId }, { $set: { produtos: array }});
            const arrayProdutos = await cartsCollection.findOne({ userId: session.userId });
            return res.send(arrayProdutos.produtos).status(200);
        }
    } catch(error) {
        return res.sendStatus(500);
    }
}

export async function removeOne(req, res) {
    const product = req.body.name;
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
        if (products.some(e => e.name === product)) {
            for (let i=0; i<products.length; i++) {
                if (products[i].name === product) {
                    const quantidade = products[i].qtd - 1;
                    if (quantidade === 0) {
                        const oldArray = [...products];
                        const newArray = oldArray.filter(item => {return item.name !== product});
                        await cartsCollection.updateOne({ userId: session.userId }, { $set: { produtos: newArray }});
                        const arrayProdutos = await cartsCollection.findOne({ userId: session.userId });
                        return res.send(arrayProdutos.produtos).status(200);
                    } else {
                        const array = [{ name: product, qtd: quantidade }, ...products];
                        array.splice(i+1, 1);
                        await cartsCollection.updateOne({ userId: session.userId }, { $set: { produtos: array }});
                        const arrayProdutos = await cartsCollection.findOne({ userId: session.userId });
                        return res.send(arrayProdutos.produtos).status(200);
                    }
                }
            }
        }
    } catch(error) {
        return res.sendStatus(500);
    }
}

export async function getCart(req, res) {
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
        res.send(products).status(200);
    } catch(error) {
        res.sendStatus(500);
    }
}