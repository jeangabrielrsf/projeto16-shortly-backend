import connection from "../database/database.js";

async function listLinks(req, res) {
	try {
		const { authorization } = req.headers;
		const token = authorization?.replace("Bearer ", "");
		if (!token) {
			return res.sendStatus(401);
		}

		const result = await connection.query(
			`
            SELECT 
                users.id, 
                users.name,
                SUM(visits.views) AS "visitCount",
                json_agg(
                    json_build_object(
                    'id', urls.id,
                    'shortUrl', urls."shortUrl",
                    'url', urls.url,
                    'visitCount', visits.views
                ) 
                )AS "shortenedUrls"
                
            FROM users 
            JOIN sessions ON sessions."userId" = users.id
            JOIN urls ON urls."userId" = users.id
            JOIN visits ON urls.id = visits."urlId"
            WHERE sessions.token = $1
            GROUP BY users.id
            ;
        `,
			[token]
		);

		return res.status(200).send(result.rows[0]);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

export { listLinks };
