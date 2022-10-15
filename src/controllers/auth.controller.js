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
		const { email, password } = req.body;
		const validation = signInSchema.validate(
			{
				email,
				password,
			},
			{ abortEarly: false }
		);
		if (validation.error) {
			return res
				.status(422)
				.send(validation.error.details.map((item) => item.message));
		}
		const userExists = await connection.query(
			`
            SELECT * FROM users WHERE email = $1;
        `,
			[email]
		);
		if (userExists.rowCount == 0) {
			return res.sendStatus(401);
		}

		const decryptPassword = bcrypt.compareSync(
			password,
			userExists.rows[0].password
		);
		console.log(decryptPassword);
		if (!decryptPassword) {
			return res.sendStatus(401);
		}

		console.log(userExists.rows[0].id);
		const token = uuid();
		connection.query(
			`
		    INSERT INTO sessions (token, "userId") VALUES ($1, $2);
		`,
			[token, userExists.rows[0].id]
		);

		return res.status(200).send(token);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

export { signUp, signIn };
