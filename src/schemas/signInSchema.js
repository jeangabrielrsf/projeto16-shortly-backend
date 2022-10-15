import Joi from "joi";

const signInSchema = Joi.object({
	email: Joi.string().empty().email({ minDomainSegments: 2 }).required(),
	password: Joi.string().empty().required(),
});

export default signInSchema;
