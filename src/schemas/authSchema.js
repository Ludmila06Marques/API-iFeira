import joi from 'joi'

export const userSchema=joi.object({
    email:joi.string().email().required(),
   name:joi.string().required(),
    password:joi.string().required(),
   home:joi.string().required()


})

 export const loginSchema=joi.object({
    email:joi.string().email().required(),
    password:joi.string().required()
})