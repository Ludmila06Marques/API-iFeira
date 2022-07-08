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