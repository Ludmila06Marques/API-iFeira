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

export async function listItemsFromCategory(req, res) {
    console.log(req.body)
    const category = req.body.category;
    console.log("alo")
    console.log(category)
    try {
        const productsArray = await db.collection("products").find().toArray();
        const selectedProductsArray = productsArray.filter(item => {return item.category === category});
        console.log(selectedProductsArray);
        res.send(selectedProductsArray).status(200);
    } catch(error) {
        res.sendStatus(500);
    }
}