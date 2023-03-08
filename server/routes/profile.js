const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	const userId = req.session.userId;

	if (!userId) {
		return res.status(401).send("Unauthorized");
	}

	req.db.get("SELECT * FROM users WHERE id = ?", userId, (err, row) => {
		if (err) {
			console.error(err.message);
			return res.status(500).send("Internal server error");
		}

		if (!row) {
			return res.status(401).send("Unauthorized");
		}

		res.json(row);
	});
});
module.exports = router;
