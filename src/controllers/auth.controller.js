import connection from "../database/database.js";
import signInSchema from "../schemas/signInSchema.js";
import signUpSchema from "../schemas/signUpSchema.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

async function signUp(req, res) {
	try {
		const { name, email, password, confirmPassword } = req.body;
		const validation = signUpSchema.validate(
			{
				name,
				email,
				password,
				confirmPassword,
			},
			{ abortEarly: false }
		);
		if (validation.error) {
			return res
				.status(422)
				.send(validation.error.details.map((item) => item.message));
		}

		const emailCheck = await connection.query(
			`
            SELECT * FROM users WHERE users.email = $1;
        `,
			[email]
		);

		if (emailCheck.rowCount > 0) {
			return res.sendStatus(409);
		}

		const hashedPassword = bcrypt.hashSync(password, 10);

		await connection.query(
			`
                INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
            `,
			[name, email, hashedPassword]
		);

		return res.sendStatus(201);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

async function signIn(req, res) {
	try {
		const { email, passsword } = req.body;
		const validation = signInSchema.validate(
			{
				email,
				passsword,
			},
			{ abortEarly: false }
		);
		if (validation.error) {
			return res
				.status(422)
				.send(validation.error.details.map((item) => item.message));
		}

		return res.sendStatus(200);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

export { signUp };
