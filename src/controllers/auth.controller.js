import connection from "../database/database.js";
import signUpSchema from "../schemas/signUpSchema.js";

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

		await connection.query(
			`
                INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
            `,
			[name, email, password]
		);

		return res.sendStatus(201);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

export { signUp };
