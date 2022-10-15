import Joi from "joi";

const shortenUrlSchema = Joi.object({
	url: Joi.string().uri(),
});

export default shortenUrlSchema;
