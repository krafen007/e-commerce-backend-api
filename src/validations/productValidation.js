import Joi from 'joi';

export const productSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().valid('electric', 'food', 'clothes').required(),
});
