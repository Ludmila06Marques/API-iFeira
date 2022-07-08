import { db } from "../dbStrategy/mongo.js";

export async function listCategories(req, res) {
    try {
        const categoriesList = await db.collection("categories").find().toArray();
        // OK
        return res.send(categoriesList).status(200);
    } catch(error) {
        // Internal Server Error
        return res.sendStatus(500);
    }
}