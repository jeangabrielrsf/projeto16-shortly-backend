import Joi from "joi";

const signUpSchema = Joi.object({
	name: Joi.string().empty().required(),
	email: Joi.string().empty().email({ minDomainSegments: 2 }).required(),
	password: Joi.string().empty().required(),
	confirmPassword: Joi.ref("password"),
});

export default signUpSchema;
