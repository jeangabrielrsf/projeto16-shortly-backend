import connection from "../database/database.js";
import shortenUrlSchema from "../schemas/shortenUrlSchema.js";
import { nanoid } from "nanoid";

async function shortenUrl(req, res) {
	try {
		const { authorization } = req.headers;
		const token = authorization?.replace("Bearer ", "");
		if (!token) {
			return res.sendStatus(401);
		}
		const { url } = req.body;
		const validate = shortenUrlSchema.validate(
			{
				url,
			},
			{
				abortEarly: false,
			}
		);
		if (validate.error) {
			return res
				.status(422)
				.send(validate.error.details.map((item) => item.message));
		}
		const shortUrl = nanoid(6);

		const userId = await connection.query(
			`
            SELECT sessions."userId" FROM sessions WHERE sessions.token = $1;
        `,
			[token]
		);

		const checkUrl = await connection.query(
			`
            SELECT * FROM urls WHERE url = $1 AND "userId" = $2;
        `,
			[url, userId.rows[0].userId]
		);
		if (checkUrl.rowCount > 0) {
			return res
				.status(409)
				.send({ message: "Url já encurtada pelo usuário." });
		}

		await connection.query(
			`
		    INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1,$2,$3);
		`,
			[url, shortUrl, userId.rows[0].userId]
		);

		return res.status(201).send({ shortUrl });
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

async function getUrl(req, res) {
	try {
		const { id } = req.params;

		const idCheck = await connection.query(
			`
            SELECT * FROM urls WHERE id = $1;
        `,
			[id]
		);
		if (idCheck.rowCount === 0) {
			return res.sendStatus(404);
		}

		delete idCheck.rows[0].userId;
		delete idCheck.rows[0].createdAt;

		return res.status(200).send(idCheck.rows[0]);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

export { shortenUrl, getUrl };
