import Joi from "joi";

const signInSchema = Joi.object({
	email: Joi.string().empty().email({ minDomainSegments: 2 }),
	password: Joi.string().empty(),
});

export default signInSchema;
