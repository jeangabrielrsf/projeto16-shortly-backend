import Joi from "joi";

const signUpSchema = Joi.object({
	name: Joi.string().empty(),
	email: Joi.string().empty().email({ minDomainSegments: 2 }),
	password: Joi.string().empty(),
	confirmPassword: Joi.ref("password"),
});

export default signUpSchema;
