import Joi from 'joi';

const categorySchema = Joi.object({
    name: Joi.string().min(3).max(32).required(),
    image: Joi.string().uri().optional(),
});

export default categorySchema;
