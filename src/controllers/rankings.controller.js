import connection from "../database/database.js";

async function getRanking(req, res) {
	try {
		const ranking = await connection.query(`
            SELECT
                users.id,
                users.name,
                COUNT(urls."shortUrl") AS "linksCount",
                COALESCE(SUM(visits.views), 0) AS "visitCount"
            FROM users
            LEFT JOIN urls ON urls."userId" = users.id
            LEFT JOIN visits ON visits."urlId" = urls.id 
            GROUP BY (users.id, urls."userId")
            ORDER BY "visitCount" DESC
            LIMIT 10;
        `);

		return res.status(200).send(ranking.rows);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export { getRanking };
