import joi from "joi";

export const productSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    price: joi.string().required(),
    category: joi.string().valid("carnes", "verduras", "legumes", "frutas").required()
});