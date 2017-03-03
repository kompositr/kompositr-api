import * as Joi from "joi";

export const updateKomposition = Joi.object({
    action: Joi.object({
        command: Joi.string().trim().required(),
        name: Joi.string().trim().required(),
        type: Joi.string().trim().required()
    }).required(),
    id: Joi.number().allow(null),
    statements: Joi.array().items(Joi.object({phrase: Joi.string().trim().required() })).required()
});

export const jwtValidator = Joi.object({authorization: Joi.string().required()}).unknown();
